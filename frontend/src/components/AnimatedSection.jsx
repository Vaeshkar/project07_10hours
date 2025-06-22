// AnimatedSection.jsx
import { motion } from 'framer-motion';

export default function AnimatedSection({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}