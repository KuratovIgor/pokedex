import { AxiosRequestConfig } from 'axios'
import { AxiosService } from '@/api/axiosService'

class PokemonAPI extends AxiosService {
  constructor(config?: AxiosRequestConfig) {
    super(config)
  }

  public getPokemonList(offset: number) {
    return this.axiosCall({
      method: 'get',
      url: '/api/pokemon',
      params: {
        offset: offset,
        limit: 10,
      },
    })
  }

  public getPokemonDelail(id: number) {
    return this.axiosCall({
      method: 'get',
      url: `/api/pokemon/${id}`,
    })
  }

  public getAbilityInfo(abilityName: string) {
    return this.axiosCall({
      method: 'get',
      url: `/api/ability/${abilityName}`,
    })
  }
}

export const pokemonAPI = new PokemonAPI({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? `${process.env.VUE_APP_BASE_URI}`
      : '',
  withCredentials: false,
})
