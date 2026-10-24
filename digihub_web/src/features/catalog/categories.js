import { BookOpen, Code2, Gamepad2, GraduationCap, LayoutTemplate, Puzzle, Shapes, SlidersHorizontal } from 'lucide-react'

// Lista temporária para navegação. Será substituída pelas categorias vindas da API (catálogo).
export const featuredCategories = [
  { slug: 'ebooks', label: 'E-books', icon: BookOpen },
  { slug: 'cursos', label: 'Cursos', icon: GraduationCap },
  { slug: 'templates', label: 'Templates', icon: LayoutTemplate },
  { slug: 'presets', label: 'Presets', icon: SlidersHorizontal },
  { slug: 'recursos-graficos', label: 'Recursos gráficos', icon: Shapes },
  { slug: 'plugins', label: 'Plugins', icon: Puzzle },
  { slug: 'scripts', label: 'Scripts e código', icon: Code2 },
  { slug: 'jogos', label: 'Jogos e mods', icon: Gamepad2 },
]
