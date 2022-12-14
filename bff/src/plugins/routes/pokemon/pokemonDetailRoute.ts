import { Static, Type } from '@sinclair/typebox'
import { FastifyInstance } from 'fastify/types/instance'
import { PokemonDetailMapper } from '~/plugins/mappers/pokemonDetailMapper'
import { EvolutionMapper, EvolutionStageType, StageType } from '~/plugins/mappers/evolutionMapper'
import { DetailFullMapper, PokemonDetailType } from '~/plugins/mappers/detailFullMapper'
import { getPokemonImage } from '~/plugins/mappers/pokemonMapper'

const PokemonSchema = Type.Object({
  pokemonInfo: Type.Object({
    image: Type.String(),
    id: Type.Number(),
    name: Type.String(),
    types: Type.Array(Type.String()),
    height: Type.Number(),
    weight: Type.Number(),
    gender: Type.String(),
    category: Type.String(),
    abilities: Type.Array(Type.String()),
    stats: Type.Object({
      hp: Type.Number(),
      attack: Type.Number(),
      defence: Type.Number(),
      specialAttack: Type.Number(),
      specialDefence: Type.Number(),
      speed: Type.Number(),
    })
  }),
  evolution: Type.Array(Type.Object({
    stage: Type.Array(Type.Object({
      name: Type.String(),
      id: Type.Number(),
      image: Type.String(),
      types: Type.Array(Type.String())
    })),
  }))
})

const ResponseSchema = Type.Object({
  pokemon: PokemonSchema,
})
export type ResponseSchemaType = Static<typeof ResponseSchema>

const ParamsSchema = Type.Object({
  id: Type.Optional(Type.Number())
})

const pokemonRoute = (fastify: FastifyInstance) => {
  return fastify.get<{
    Response: ResponseSchemaType,
    Params: Static<typeof ParamsSchema>
  }>(
    '/api/pokemon/:id',
    {
      schema: {
        params: ParamsSchema,
        response: {
          200: ResponseSchema,
        },
      }
    },
    async (req, repl) => {
      try {
        const id = req.params.id
        if (id)  {
          const pokemonFromApi = await fastify.axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
          const pokemonSpecies = await fastify.axios.get(pokemonFromApi.data.species.url)
          const evolutionFromApi = await fastify.axios.get(pokemonSpecies.data.evolution_chain.url)

          const genera = pokemonSpecies.data.genera
          const gender: string = await getPokemonGender(pokemonFromApi.data.name, fastify)

          const urlStages = EvolutionMapper.mapEvolutionToFronted(evolutionFromApi.data.chain)
          const pokemonInfo = PokemonDetailMapper.mapPokemonInfoToFrontend(
            pokemonFromApi.data,
            gender,
            genera
          )

          const evolutionChain = await getPokemonEvolution(urlStages, fastify)

          const detailInfo: PokemonDetailType = DetailFullMapper.mapDetailInfoToFrontend(
            pokemonInfo,
            evolutionChain,
          )

          repl.header('Access-Control-Allow-Origin', '*')

          await repl.send({
            pokemon: detailInfo
          })
        }
      } catch (e) {
        fastify.log.error(e)
      }
    }
  )
}

async function getPokemonEvolution(stages: StageType[], fastify): Promise<EvolutionStageType[]> {
  let evolutionChain: EvolutionStageType[] = []

  for (let i in stages) {
    evolutionChain.push({ stage: [] })
    for (let url of stages[i].stage){
      const pokemonSpecies = await fastify.axios.get(url)
      const pokemonFromApi = await fastify.axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonSpecies.data.id}`)

      const image: string = getPokemonImage(pokemonFromApi.data)

      const pokemon = {
        id: pokemonFromApi.data.id,
        name: pokemonFromApi.data.name,
        image: image,
        types: pokemonFromApi.data.types.map((item) => item.type.name),
      }

      evolutionChain[i].stage.push(pokemon)
    }
  }

  return evolutionChain
}

async function getPokemonGender(name: string, fastify): Promise<string> {
  let result = ''

  const female = await fastify.axios.get('https://pokeapi.co/api/v2/gender/1/')
  const male = await fastify.axios.get('https://pokeapi.co/api/v2/gender/2/')

  const femaleList = female.data.pokemon_species_details
  const maleList = male.data.pokemon_species_details

  const isPokemonFemale = femaleList.filter(item => item.pokemon_species.name === name).length > 0
  const isPokemonMale = maleList.filter(item => item.pokemon_species.name === name).length > 0

  if (isPokemonFemale){
    result += '♀ '
  }

  if (isPokemonMale){
    result += '♂ '
  }

  if (result === '') {
    result = 'Genderless'
  }

  return result
}

export default pokemonRoute
