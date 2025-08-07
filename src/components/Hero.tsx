import React from 'react';

type Props = {
    translate: any;
    language: string;
};

const Hero: React.FC<Props> = ({translate, language}) => (
    <div className="landing-features fade-in">
        {translate.features.map((feature: any, index: number) => (
            <div className="landing-feature" key={index}>
                {feature.icon}
                <div className="landing-feature-title">
                    {feature.title[language]}
                </div>
                <div className="landing-feature-desc">
                    {feature.desc[language]}
                </div>
            </div>
        ))}
    </div>
);

export default Hero;