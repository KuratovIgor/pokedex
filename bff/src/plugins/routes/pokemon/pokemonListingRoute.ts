import { FastifyInstance } from 'fastify'
import { Static, Type } from '@sinclair/typebox'
import { PokemonMapper } from '../../mappers/PokemonMapper'
import type { PokemonType } from '../../mappers/PokemonMapper'

const PaginationSchema = Type.Object({
  total: Type.Number(),
  current: Type.Number()
})

const PokemonListSchema = Type.Array(
  Type.Object({
    image: Type.String(),
    id: Type.Number(),
    name: Type.String(),
    abilities: Type.Array(Type.String())
  })
)

const ParamSchema = Type.Object({
  offset: Type.Number(),
  limit: Type.Number()
})

const ResponseSchema = Type.Object({
  pokemon: PokemonListSchema,
  paginationInfo: PaginationSchema,
  success: Type.Boolean()
})
export type ResponseSchemaType = Static<typeof ResponseSchema>
export type PaginationSchemaType = Static<typeof PaginationSchema>
export type QuerySchemaType = Static<typeof ParamSchema>

const pokemonListRoute = (fastify: FastifyInstance) => {
  return fastify.get<{
    Response: ResponseSchemaType,
    Querystring: QuerySchemaType
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
        const pokemonListFromApi = await fastify.axios.get('https://pokeapi.co/api/v2/pokemon',  {
          params: {
            ...req.query,
          }
        })

        const newPokemonList = await getPokemonListing(pokemonListFromApi, fastify)

        const paginationInfo = PokemonMapper.mapPaginationInfoToFrontend(
          pokemonListFromApi.data.count,
          req.query.offset,
          req.query.limit
        )

        await repl.send({
          pokemon: newPokemonList,
          paginationInfo,
          success: true
        })

      } catch (e: any) {
        await repl.send({
          success: false
        })
      }
    }
  )
}

async function getPokemonListing(pokemonList, fastify){
  let result: PokemonType[] = []

  for (let item of pokemonList.data.results){
    const pokemonFromApi = await fastify.axios.get(item.url)

    const pokemonInfo = PokemonMapper.mapPokemonInfoToFrontend(item.name, pokemonFromApi.data)

    result.push(pokemonInfo)
  }

  return result
}

export default pokemonListRoute
