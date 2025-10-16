export interface PluginTypes {
  /**
   * Enable or disable plugin
   * @default false
   */
  enabled?: boolean
}

export interface NewCollectionTypes {
  title: string
}

export type Label = string | Record<string, string> | false
