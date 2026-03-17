import { motion } from 'framer-motion'

interface CategoryFilterProps {
  categories: { slug: string; title: string }[]
  active: string
  onChange: (slug: string) => void
}

export default function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  const allCategories = [{ slug: 'all', title: 'All' }, ...categories]

  return (
    <div className="flex flex-wrap items-center gap-6 md:gap-10">
      {allCategories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onChange(cat.slug)}
          className="relative font-body text-[12px] font-medium uppercase tracking-[0.15em] pb-2 transition-colors duration-300"
          style={{ color: active === cat.slug ? 'var(--color-charcoal)' : 'var(--color-muted)' }}
        >
          {cat.title}
          {active === cat.slug && (
            <motion.div
              layoutId="filter-underline"
              className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
