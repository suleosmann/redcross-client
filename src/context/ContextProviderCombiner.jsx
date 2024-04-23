import React from 'react';

const ContextProviderCombiner = ({ contexts, children }) =>
    contexts.reduceRight(
        (kids, Parent) => React.cloneElement(Parent, { children: kids }),
        children,
    );

export default ContextProviderCombiner;
