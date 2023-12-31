import { COLORS, FONTS, SIZES, icons, images } from "../constants";
const confirmStatus = "C";
const pendingStatus = "P";
export const incomeData = [
  {
    id: 1,
    name: "salary",
    icon: icons.salary,
    color: COLORS.lightgreen,
    income: [
      {
        id: 2,
        title: "Full Time Job",
        description: "Full Time Job salary",
        location: "company",
        total: 1000.0,
        status: confirmStatus,
      },
      {
        id: 3,
        title: "Full Time Job",
        description: "Full Time Job salary",
        location: "company",
        total: 1000.0,
        status: pendingStatus,
      },
    ],
  },
  {
    id: 2,
    name: "Stock",
    icon: icons.stock,
    color: COLORS.darkgreen,
    income: [
      {
        id: 5,
        title: "bitcoin",
        description: "Vitamin",
        location: "ByProgrammers' Pharmacy",
        total: 500.0,
        status: confirmStatus,
      },
      {
        id: 6,
        title: "Vitamins",
        description: "Vitamin",
        location: "ByProgrammers' Pharmacy",
        total: 25.0,
        status: pendingStatus,
      },
    ],
  },
];
