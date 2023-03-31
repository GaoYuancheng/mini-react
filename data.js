// dom
const dom = {
  type: "div",
  props: {
    id: "foo",
    children: [
      {
        type: "div",
        props: {
          children: [
            {
              type: "a",
              props: {
                children: [
                  {
                    type: "TEXT_ELEMENT",
                    props: {
                      nodeValue: "bar",
                      children: [],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        type: "b",
        props: {
          children: [],
        },
      },
    ],
  },
};
