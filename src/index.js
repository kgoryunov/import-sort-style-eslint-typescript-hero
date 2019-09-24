exports.default = function(styleApi, file, options) {
  const {
    alias,
    and,
    hasMember,
    hasNoMember,
    isAbsoluteModule,
    isRelativeModule,
    moduleName,
    unicode: stringSort,
  } = styleApi;

  const tsHeroGroupsConfig = options.tsHeroGroupsConfig || ['Plains', 'Modules', 'Workspace'];

  const eslintSort = (first, second) => stringSort(first, second);

  const typescriptHeroSort = (first, second) =>
    stringSort(first.toLowerCase(), second.toLowerCase());

  const tsHeroStylesByGroupName = {
    Modules: {
      match: and(isAbsoluteModule, hasMember),
      sort: moduleName(typescriptHeroSort),
      sortNamedMembers: alias(eslintSort),
    },
    Plains: {
      match: and(isAbsoluteModule, hasNoMember),
      sort: moduleName(typescriptHeroSort),
    },
    Workspace: {
      match: isRelativeModule,
      sort: moduleName(typescriptHeroSort),
      sortNamedMembers: alias(eslintSort),
    },
    Remaining: undefined,
  };

  const importSortStyles = [];

  for (const groupNameOrRegexp of tsHeroGroupsConfig) {
    const style = tsHeroStylesByGroupName[groupNameOrRegexp];

    if (style) {
      importSortStyles.push(style);
    } else if (isRegexpGroup(groupNameOrRegexp)) {
      const matchingRegexp = buildRegexpGroupMatcher(groupNameOrRegexp);

      importSortStyles.push({
        match: matchingRegexp,
        sort: moduleName(typescriptHeroSort),
        sortNamedMembers: alias(eslintSort),
      });
    }

    importSortStyles.push({ separator: true });
  }

  return importSortStyles;
};

const isRegexpGroup = group => /^\/.+\/$/.test(group);

const buildRegexpGroupMatcher = regexpString => imported => {
  const regexpStringWithTrimmedSlashes = regexpString.substring(1, regexpString.length - 1);
  const regex = new RegExp(regexpStringWithTrimmedSlashes, 'g');

  return regex.test(imported.moduleName);
};
