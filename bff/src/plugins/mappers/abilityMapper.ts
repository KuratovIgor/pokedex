export type AbilityType = {
  name: string,
  description: string,
}

export class AbilityMapper {
  static mapAbilityInfoToFrontend = (ability: any): AbilityType => {

    const englishDescription = ability.effect_entries.filter(item => item.language.name === 'en')

    return {
      name: ability.name,
      description: englishDescription[0].effect,
    }
  }
}
