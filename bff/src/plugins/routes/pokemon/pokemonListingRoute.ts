import { FastifyInstance } from 'fastify'
import { Static, Type } from '@sinclair/typebox'
import { PokemonMapper } from '../../mappers/pokemonMapper';

const PaginationSchema =
  Type.Object({
    total: Type.Number(),
    current: Type.Number()
  })

const PokemonListSchema =
  Type.Object({
    results: Type.Array(
      Type.Object({
        name: Type.String(),
        url: Type.String()
      })
    ),
  })

const ParamSchema =
  Type.Object({
    offset: Type.Number(),
    limit: Type.Number()
  })

const ResponseSchema = Type.Object({
  pokemon: PokemonListSchema,
  paginationInfo: PaginationSchema
})
export type ResponseSchemaType = Static<typeof ResponseSchema>
export type PaginationSchemaType = Static<typeof PaginationSchema>
export type ParamSchemaType = Static<typeof ParamSchema>

const pokemonListRoute = (fastify: FastifyInstance) => {
  return fastify.get<{
    Response: ResponseSchemaType,
    Querystring: ParamSchemaType
  }>(
    '/api/pokemon',
    {
      schema: {
        response: {
          200: ResponseSchema,
        },
      }
    },
    async (req, repl) => {
      try {
        const pokemonList = await fastify.axios.get('https://pokeapi.co/api/v2/pokemon',  {
          params: {
            ...req.query,
          }
        })

        const paginationInfo = PokemonMapper.getPaginationInfo(
          pokemonList.data.count,
          req.query.offset,
          req.query.limit
        )

        console.log(paginationInfo)

        await repl.send({
          pokemon: pokemonList.data,
          paginationInfo
        })

      } catch (e) {
        fastify.log.error(e)
      }
    }
  )
}

export default pokemonListRoute
