// Hook Templates System for Ravlo
export const CURIOSITY_HOOKS = [
  "Need ideas for…",
  "Did you know that...",
  "Wondering how to...",
  "This is one of the most fierce enemies of XYZ",
  "X Mistakes…",
  "X Tips…",
  "Are you ____ and not ____? Then this post is for you",
  "Do you think that _____ is out of reach?",
  "10 significant lies you're told about the world",
  "Doing _____ is like _____. Here's why 👇",
  "X ways to ____",
  "15 of the most useful X for Y",
  "Here are the 9 secrets to building an audience fast",
  "7 genius marketing tactics to make you go viral:",
  "The easiest way to make $9,000 every month.",
  "It's hard to find good marketing stuff online. Here's my top 5",
  "I don't have a degree, so I've had to learn on my own",
  "How to write a solid blog post in one hour.",
  "I was so impressed by X I thought I'd share it.",
  "There are 2 types of [audience]:",
  "Quick tip to [do thing]:",
  "Quick hack to [do thing]:",
  "[advice] — here's how:",
  "Here's how you can [do thing] for free:",
  "8 things that destroy [something your audience cares about]:",
  "Here are 4 lessons I learned the hard way:",
  "Here are 6 dead-simple ways to [do thing]:",
  "Here's how to [do thing] in 7 simple steps:",
  "How to [do thing] in 23.27 seconds:",
  "I tried [doing thing]. There were 5 weird results:",
  "These 5 traits are so underrated, yet they can skyrocket your career:"
];

export const STORY_HOOKS = [
  "I want to tell you a story how...",
  "Imagine you're...",
  "It felt like a punch to the gut…",
  "I got fired.",
  "I quit.",
  "I turned down [x] dollars",
  "I lost everything.",
  "I lost [x] dollars.",
  "I gave up.",
  "We were on the brink of failure.",
  "My time was up.",
  "My hands were shaking.",
  "I couldn't believe it.",
  "I wanted to cry.",
  "There had to be another way.",
  "I clenched my fist.",
  "I grit my teeth.",
  "It was over.",
  "I want to be honest for a second",
  "I have to talk about this.",
  "I hated it.",
  "I ended the partnership.",
  "They said no.",
  "I never heard back from them.",
  "They laughed at me.",
  "It hurt.",
  "It sucked.",
  "He/She didn't even look at me.",
  "I wanted it to be true.",
  "I lost control.",
  "I wanted more.",
  "I couldn't see it.",
  "I wanted to stop.",
  "I couldn't stop.",
  "I broke down.",
  "I couldn't handle it.",
  "It felt like a punch to the gut.",
  "I tried.",
  "I put everything I had into it.",
  "I couldn't stand it",
  "I had to leave.",
  "I couldn't handle it.",
  "They laughed at me.",
  "They stepped all over me.",
  "It was brutal.",
  "They forced me to do it.",
  "They outsourced my job.",
  "They told me to pick up my things and leave.",
  "Storytime... this is by far the craziest thing to ever happen at one of the keynotes in my life.",
  "You would not believe this",
  "I just gave my 2 weeks' notice to quit my full-time job",
  "One of the most exciting 2021 projects got off the ground.",
  "I committed to [doing thing] [time] ago. Here are my results:"
];

export const PROVOKE_HOOKS = [
  "You must have noticed it by now",
  "Someone has to say this",
  "Have you been here before?",
  "I want to be real for a second.",
  "It kills me to say this.",
  "It hurts to say this.",
  "I wish I didn't have to say this.",
  "If you're a SaaS founder, you need to study Notion",
  "I stopped ____",
  "What do you wanna be when you grow up? is one of the most useless questions an adult can ask a child.",
  "Stop calling yourself a … if:",
  "[topic] is NOT about:",
  "Unpopular opinion: [share something controversial]"
];

export type HookCategory = 'curiosity' | 'story' | 'provoke';

export interface HookTemplate {
  id: string;
  category: HookCategory;
  template: string;
  engagementScore?: number;
  usageCount?: number;
}

export const getAllHooks = (): HookTemplate[] => {
  const hooks: HookTemplate[] = [];
  CURIOSITY_HOOKS.forEach((template, index) => {
    hooks.push({
      id: `curiosity-${index}`,
      category: 'curiosity',
      template,
      engagementScore: 4.0 + (index % 5) * 0.3, // 4.0, 4.3, 4.6, 4.9, 5.2
      usageCount: 20 + (index * 7) % 50 // 20, 27, 34, ...
    });
  });
  STORY_HOOKS.forEach((template, index) => {
    hooks.push({
      id: `story-${index}`,
      category: 'story',
      template,
      engagementScore: 5.0 + (index % 5) * 0.4, // 5.0, 5.4, 5.8, ...
      usageCount: 30 + (index * 9) % 60 // 30, 39, 48, ...
    });
  });
  PROVOKE_HOOKS.forEach((template, index) => {
    hooks.push({
      id: `provoke-${index}`,
      category: 'provoke',
      template,
      engagementScore: 4.5 + (index % 5) * 0.5, // 4.5, 5.0, 5.5, ...
      usageCount: 15 + (index * 5) % 40 // 15, 20, 25, ...
    });
  });
  return hooks;
};

export const getHooksByCategory = (category: HookCategory): HookTemplate[] => {
  return getAllHooks().filter(hook => hook.category === category);
};

export const getTotalHookCount = (): number => {
  return CURIOSITY_HOOKS.length + STORY_HOOKS.length + PROVOKE_HOOKS.length;
};

export const getCategoryStats = () => {
  return {
    curiosity: CURIOSITY_HOOKS.length,
    story: STORY_HOOKS.length,
    provoke: PROVOKE_HOOKS.length,
    total: getTotalHookCount()
  };
};