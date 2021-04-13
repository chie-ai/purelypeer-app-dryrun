
export function mutateQuests (state, quests) {
  state.quests = quests
}

export function mutateForMapInfo (state, questInfoInMap) {
  state.createdQuestInfo.coordinates = questInfoInMap[0]
  state.createdQuestInfo.radius = questInfoInMap[1]
  state.createdQuestInfo.tier = questInfoInMap[2]
}
