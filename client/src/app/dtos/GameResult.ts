export class GameResult {
  login: string
  score: number
  createdAt: Date

  constructor(login: string, score: number, createdAt: Date = null) {
    this.login = login
    this.score = score
    this.createdAt = createdAt
  }
}
