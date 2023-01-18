const items = [
  {
    title: "Home",
    name: "home",
    icon: "mdi mdi-home",
    value: "home",
    path: "/",
  },
  {
    title: "About",
    name: "about",

    icon: "mdi mdi-forum",
    value: "about",
    path: "/about",
  },
  {
    group: true,
    groupindex: 0,
    name: "contents",
    title: "Contents",
    icon: "mdi mdi-bookshelf",
    value: "Contents",
    subItems: [
      {
        title: "ContentOne",
        name: "ContentOne",
        icon: "mdi mdi-text-box-multiple",
        value: "contentone",
        path: "/contents/ContentOne",
      },
      {
        title: "ContentTwo",
        name: "ContentTwo",
        icon: "mdi mdi-text-box-multiple",
        value: "contenttwo",
        path: "/contents/ContentTwo",
      },
    ],
  },
  {
    group: true,
    groupindex: 1,
    name: "contents2",
    title: "Contents2",
    icon: "mdi mdi-bookshelf",
    value: "Contents2",
    subItems: [
      {
        title: "ContentThree",
        name: "ContentThree",
        icon: "mdi mdi-text-box-multiple",
        value: "contentthree",
        path: "/contents/ContentThree",
      },
      {
        title: "ContentFour",
        name: "ContentFour",
        icon: "mdi mdi-text-box-multiple",
        value: "contentfour",
        path: "/contents/ContentFour",
      },
    ],
  },
];

export default items;
