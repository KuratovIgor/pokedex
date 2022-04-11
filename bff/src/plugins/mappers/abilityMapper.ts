export type AbilityType = {
  name: string,
  description: string,
}

export class AbilityMapper {
  static mapAbilityInfoToFrontend = (ability: any): AbilityType => {
    let description: string
    let aboutAbility: any[] = ability.effect_entries.filter(item => item.language.name === 'en')

    if (!aboutAbility.length) {
      aboutAbility = ability.flavor_text_entries.filter(item => item.language.name === 'en')

      description = aboutAbility[0].flavor_text
    }
    else {
      description = aboutAbility[0].effect
    }

    return {
      name: ability.name,
      description: description,
    }
  }
}
