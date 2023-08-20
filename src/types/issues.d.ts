export interface IIssue {
  /** URL of an issue */
  url: string

  /**
     * URL to retreive comments of this issue
     *
     * @example "https://api.github.com/repos/facebook/react/issues/27250/comments"
     */
  comments_url: string

  /** Issue ID */
  number: number

  /**
     * Title of the issue
     *
     * *Must be shortened*
     */
  title: string

  /** Details about author of the issue */
  user: {
    /** Github nickname of the author */
    login: string
    /** Link to his account photo */
    avatar_url: string
    /** Link to Github profile */
    html_url: string
  },

  /** All labels of the issue */
  labels: {
    /** Label ID */
    id: number

    /** @example 'Status: Unconfirmed' */
    name: string
    /**
       * Hex of the label background
       * @example "d4c5f9"
       */
    color: string
    /** Label description */
    description: string
  }[],
  /** Current status of the issue */
  state: 'open'
  /** Tells wether the issue's opened or not */
  locked: false
  /** Comments amount */
  comments: number
  /** UTC datetime of when the issue was opened */
  created_at: '2023-08-19T17:00:43Z'
  /** UTC datetime of when the issue was updated */
  updated_at: '2023-08-19T17:12:42Z'
  /**
     * UTC datetime of when the issue was closed.
     *
     * `null` if it wasn't closed
     */
  closed_at: string | null
  /**
     * Actual Markdown body of the issue
     */
  body: string
}
