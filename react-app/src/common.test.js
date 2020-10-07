import { fieldSorter } from "./common";

test("fieldSorter should sort a data object by 2 columns.", () => {
  // Array to sort.
  const objectList = [
    { name: "Tom", age: 34, zipCode: "70012" },
    { name: "Zack", age: 22, zipCode: "70012" },
    { name: "Tom", age: 24, zipCode: "70012" },
    { name: "Sam", age: 28, zipCode: "70012" },
    { name: "Ryan", age: 42, zipCode: "70012" },
    { name: "Tom", age: 22, zipCode: "70012" },
  ];

  // Same array, sorted, will use to compare to result of fieldSorter.
  const sortedList = [
    { name: "Ryan", age: 42, zipCode: "70012" },
    { name: "Sam", age: 28, zipCode: "70012" },
    { name: "Tom", age: 22, zipCode: "70012" },
    { name: "Tom", age: 24, zipCode: "70012" },
    { name: "Tom", age: 34, zipCode: "70012" },
    { name: "Zack", age: 22, zipCode: "70012" },
  ];

  // Sort the array.
  const sortedObjectList = objectList.sort(fieldSorter(["name", "age"]));

  // Verify sorted array meets expectations.
  expect(JSON.stringify(sortedObjectList)).toEqual(JSON.stringify(sortedList));
});
