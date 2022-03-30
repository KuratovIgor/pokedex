import { Static, Type } from '@sinclair/typebox'
import { FastifyInstance } from 'fastify/types/instance'
import { PokemonType, EvolutionType, PokemonDetailMapper } from '../../mappers/pokemonDetailMapper'
import fastify from 'fastify'
import { type } from 'os'

const PokemonSchema = Type.Object({
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
    special_attack: Type.Number(),
    special_defence: Type.Number(),
    speed: Type.Number(),
  }),
  evolution: Type.Array(Type.Array(Type.Object({
    name: Type.String(),
    id: Type.Number(),
    image: Type.String(),
    types: Type.Array(Type.String()),
  })))
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
          const pokemonEvolution = await fastify.axios.get(pokemonSpecies.data.evolution_chain.url)

          const genera = pokemonSpecies.data.genera
          const gender: string = await getPokemonGender(pokemonFromApi.data.name, fastify)
          const evolutionChain: EvolutionType[] = await getEvolutionChain(
            pokemonEvolution.data.chain,
            fastify
          )

          const detailInfo: PokemonType = PokemonDetailMapper.mapDetailInfoToFrontend(
            pokemonFromApi.data,
            evolutionChain,
            gender,
            genera
          )

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


async function getEvolutionChain(evolves_to, fastify): Promise<EvolutionType[]> {
  let evolutionChain: EvolutionType[] = []

  await getEvolveStage(evolves_to, 0)

  async function getEvolveStage(evolves_to, stage) {
    for(let item in evolves_to) {
      if(typeof(evolves_to[item]) === 'object') {
        if (item == 'evolves_to') {
          await getEvolveStage(evolves_to[item], ++stage)
        }
        else {
          await getEvolveStage(evolves_to[item], stage)
        }
      } else {
        if (typeof(evolves_to[item]) == 'string' && evolves_to[item].includes('pokemon-species'))
        {
          const pokemonSpecies = await fastify.axios.get(evolves_to[item])
          const id = pokemonSpecies.data.id
          const pokemon = await fastify.axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
          const name = pokemon.data.name
          const image = pokemon.data.sprites.other['official-artwork'].front_default
          const types = pokemon.data.types.map((item) => item.type.name)

          const evolution = {
            id: id,
            name: name,
            image: image,
            types: types,
            stage: stage,
          }

          evolutionChain.push(evolution)
        }
      }
    }
  }

  return evolutionChain
}

async function getPokemonGender(name: string, fastify): Promise<string> {
  let result = ''

  const femaleApi = await fastify.axios.get('https://pokeapi.co/api/v2/gender/1/')
  const maleApi = await fastify.axios.get('https://pokeapi.co/api/v2/gender/2/')

  const pokemonListFemale = femaleApi.data.pokemon_species_details
  const pokemonListMale = maleApi.data.pokemon_species_details

  const isPokemonFemale = () => {
    return pokemonListFemale.filter(item => item.pokemon_species.name === name).length > 0
  }

  const isPokemonMale = () => {
    return pokemonListMale.filter(item => item.pokemon_species.name === name).length > 0
  }

  if (isPokemonFemale()){
    result += '♀ '
  }

  if (isPokemonMale()){
    result += '♂ '
  }

  return result
}

export default pokemonRoute
