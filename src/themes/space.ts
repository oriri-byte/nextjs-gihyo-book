const spaceValues = ['0px', '8px', '16px', '32px', '64px'];

type SpaceType = string[] & {
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
};

const space = spaceValues as unknown as SpaceType;

space.small = space[1];
space.medium = space[2];
space.large = space[3];
space.extraLarge = space[4];

export default space;
