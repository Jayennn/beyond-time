// src/components/AnimatedSection.js

import React from 'react';
import { motion } from 'framer-motion';

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AnimatedSection = ({ children }) => (
    <motion.div
        initial="hidden"
whileInView="visible"
viewport={{ once: true, amount: 0.5 }}
variants={sectionVariants}
className="section"
    >
    {children}
    </motion.div>
);

export default AnimatedSection;
