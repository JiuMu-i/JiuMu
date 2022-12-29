import { themes } from '../../assets/data/themes.js'
import LoadThemes from '../../util/loadThemes.js'

const ModulesTheme = {
  state: {
    background: themes['01'].Main.Background,
    headline: themes['01'].Main.Headline,
    paragraph: themes['01'].Main.Paragraph,
    button: themes['01'].Main.Button,
    buttonText: themes['01'].Main.ButtonText,
    stroke: themes['01'].Main.IllustrationStroke,
    strokeTranslucent: themes['01'].Main.IllustrationStrokeTranslucent,
    main: themes['01'].Main.IllustrationMain,
    highlight: themes['01'].Main.IllustrationHighlight,
    secondary: themes['01'].Main.IllustrationSecondary,
    tertiary: themes['01'].Main.IllustrationTertiary,
    links: themes['01'].Main.Links
  },
  getters: {},
  mutations: {
    updateTheme(state, key) {
      const loadThemes = new LoadThemes()
      const lastTheme = loadThemes.getThemes(key)
      state.background = lastTheme.Main.Background
      state.headline = lastTheme.Main.Headline
      state.paragraph = lastTheme.Main.Paragraph
      state.button = lastTheme.Main.Button
      state.buttonText = lastTheme.Main.ButtonText
      state.stroke = lastTheme.Main.IllustrationStroke
      state.strokeTranslucent = lastTheme.Main.IllustrationStrokeTranslucent
      state.main = lastTheme.Main.IllustrationMain
      state.highlight = lastTheme.Main.IllustrationHighlight
      state.secondary = lastTheme.Main.IllustrationSecondary
      state.tertiary = lastTheme.Main.IllustrationTertiary
      state.links = lastTheme.Main.Links
    }
  },
  actions: {},
  modules: {}
}

export default ModulesTheme