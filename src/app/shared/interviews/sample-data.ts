const interviewsList = {
  interviews: [
    {
      _id: "6637627cc4b31b658f807b19",
      name: "2024-05-23 - Interview",
      status: "Running",
      tags: ["Javascript", "React", "NodeJs"],
      interViewer: {
        name: "John Doe",
        email: "johndoe@gmail.com",
      },
      candidateInfo:{
        name: "John XYZ",
        email: "",
      },
      candidateStatus:"hold", // hold // rejected // selected // inProgress
      interViewInfo:{
        question:"What is React?",
        programmingLanguage:"javascript",
        codeSnippet:"const element = <h1>Hello, world</h1>;",
        output:"Hello, world",
      },
      createdAt: "2024-05-05T10:42:04.706Z",
      updatedAt: "2024-05-05T10:42:04.706Z",
    },
    {
      _id: "6637627cc4b31b658f807b19",
      tags: ["Javascript", "React", "NodeJs", "Scala","Java"],
      name: "2024-05-23 - Interview2",
      status: "Completed",
      interViewer: {
        name: "Penchal Anki",
        email: "penchalanki@gmail.com",
      },
      candidateStatus:"selected",// hold // rejected // selected // inProgress
      candidateInfo:{
        name: "Penchal Anki",
        email: "",
      },
      interViewInfo:{
        question:"What is python?",
        programmingLanguage:"python",
        codeSnippet:"print('Hello, world')",
        output:"Hello, world",
      },
      createdAt: "2024-05-05T10:42:04.706Z",
      updatedAt: "2024-05-05T10:42:04.706Z",
    },
  ],
  totalCount: 2,
};

export default interviewsList;
