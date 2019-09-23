exports.default = function (styleApi) {
  const {
    alias,
    and,
    hasMember,
    hasNoMember,
    isAbsoluteModule,
    isRelativeModule,
    moduleName,
    unicode,
  } = styleApi;

  const eslintSort = (first, second) => unicode(first, second);

  const typescriptHeroSort = (first, second) =>
    unicode(first.toLowerCase(), second.toLowerCase());

  return [
    // 1. ImportGroupKeyword.Plains e.g. import 'foo';
    {
      match: and(isAbsoluteModule, hasNoMember),
      sort: moduleName(typescriptHeroSort),
    },
    { separator: true },

    // 2. ImportGroupKeyword.Modules e.g. import Foo from 'bar';
    {
      match: and(isAbsoluteModule, hasMember),
      sort: moduleName(typescriptHeroSort),
      sortNamedMembers: alias(eslintSort),
    },
    { separator: true },

    // 3. ImportGroupKeyword.Workspace e.g. import Foo from './bar';
    {
      match: isRelativeModule,
      sort: moduleName(typescriptHeroSort),
      sortNamedMembers: alias(eslintSort),
    },
    { separator: true },

    // 4. RemainImportGroup (the rest)
  ];
};
