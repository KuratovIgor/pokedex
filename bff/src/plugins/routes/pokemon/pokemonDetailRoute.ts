import { Static, Type } from '@sinclair/typebox'
import { FastifyInstance } from 'fastify/types/instance'
import { PokemonDetailMapper } from '../../mappers/pokemonDetailMapper'

const PokemonSchema = Type.Object({
  image: Type.String(),
  id: Type.Number(),
  name: Type.String(),
  types: Type.Array(Type.String()),
  height: Type.Number(),
  weight: Type.Number(),
  abilities: Type.Array(Type.String()),
  stats: Type.Array(Type.String()),
  evolution: Type.Array(Type.Object({
    name: Type.String(),
    id: Type.Number(),
    image: Type.String(),
    types: Type.Array(Type.String())
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
        if (id) {
          const pokemonFromApi = await fastify.axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
          const pokemonSpecies = await fastify.axios.get(pokemonFromApi.data.species.url)
          const pokemonEvolution = await fastify.axios.get(pokemonSpecies.data.evolution_chain.url)

          // eslint-disable-next-line max-len
          const detailInfo = PokemonDetailMapper.mapDetailInfoToFrontend(pokemonFromApi.data, pokemonEvolution.data.chain)

         /* await repl.send({
            pokemon: detailInfo
          })*/
        }
      } catch (e) {
        fastify.log.error(e)
      }
    }
  )
}

export default pokemonRoute
