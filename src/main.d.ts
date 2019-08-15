type JsonValuesType = string | number | boolean
interface JsonType {
  [element: string]: JsonValuesType | Array<JsonValuesType | JsonType> | JsonType
}