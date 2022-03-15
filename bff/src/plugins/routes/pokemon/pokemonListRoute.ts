import { FastifyInstance } from 'fastify'
import { Static, Type } from '@sinclair/typebox'

const PokemonListSchema =
  Type.Object({
    count: Type.Number(),
    next: Type.String(),
    previous: Type.String(),
    results: Type.Array(
      Type.Object({
        name: Type.String(),
        url: Type.String()
      })
    )
  })


const ResponseSchema = Type.Object({
  pokemon: PokemonListSchema,
})
export type ResponseSchemaType = Static<typeof ResponseSchema>

const pokemonListRoute = (fastify: FastifyInstance) => {
  return fastify.get<{
    Response: ResponseSchemaType,
    Querystring: undefined
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
        const pokemonList = await fastify.axios.get('https://pokeapi.co/api/v2/pokemon')
        console.log(pokemonList.data)

        /*let i = 0

        while (pokemonList.data.next != null){
          const res = await fastify.axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${i}&limit=20`)
          console.log(res.data.results)
          i += 20
        }*/

        await repl.send({
          pokemon: pokemonList.data
        })

      } catch (e) {
        fastify.log.error(e)
      }
    }
  )
}

export default pokemonListRoute
