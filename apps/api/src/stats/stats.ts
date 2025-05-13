export class Stats {
  purchaseCounts: {
    privateLessons: number
    groupLessons: number
  }
  lessonCounts: {
    available: number
    scheduled: number
    unscheduledPrivate: number
    unscheduledGroup: number
  }
  userCounts: {
    active: number
  }
}
