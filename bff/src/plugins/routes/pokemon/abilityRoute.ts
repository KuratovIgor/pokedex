import { Static, Type } from '@sinclair/typebox'
import { FastifyInstance } from 'fastify/types/instance'
import { AbilityMapper } from '~/plugins/mappers/abilityMapper'

const AbilitySchema = Type.Object({
  name: Type.String(),
  description: Type.String(),
})

const ResponseSchema = Type.Object({
  ability: AbilitySchema,
})
export type ResponseSchemaType = Static<typeof ResponseSchema>

const ParamsSchema = Type.Object({
  abilityName: Type.Optional(Type.String())
})

const abilityRoute = (fastify: FastifyInstance) => {
  return fastify.get<{
    Response: ResponseSchemaType,
    Params: Static<typeof ParamsSchema>
  }>(
    '/api/ability/:abilityName',
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
        const abilityName = req.params.abilityName
        if (abilityName) {
          const abilityFromApi = await fastify.axios.get(`https://pokeapi.co/api/v2/ability/${abilityName}`)

          const abilityInfo = AbilityMapper.mapAbilityInfoToFrontend(abilityFromApi.data)

          repl.header('Access-Control-Allow-Origin', '*')

          await repl.send({
            ability: abilityInfo
          })
        }
      } catch (e) {
        fastify.log.error(e)
      }
    }
  )
}

export default abilityRoute
