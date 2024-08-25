export const yearFilter = (yearRange: string) => {
//   const apiKey = import.meta.env.VITE_API_KEY!;
//   const baseUrl = import.meta.env.VITE_BASE_URL!;

  //Variables de años
  let startYear: string;
  let endYear: string;
  //uso de switch y case(para poner los casos de los años)
  switch (yearRange) {
    case "1970s":
      startYear = "1970-01-01";
      endYear = "1979-12-31";
      break;
    case "1980s":
      startYear = "1980-01-01";
      endYear = "1989-12-31";
      break;
    case "1990s":
      startYear = "1990-01-01";
      endYear = "1999-12-31";
      break;
    case "2000-2005":
      startYear = "2000-01-01";
      endYear = "2005-12-31";
      break;
    case "2006-2010":
      startYear = "2006-01-01";
      endYear = "2010-12-31";
      break;
    case "2011-2015":
      startYear = "2011-01-01";
      endYear = "2015-12-31";
      break;
    case "2016-2020":
      startYear = "2016-01-01";
      endYear = "2020-12-31";
      break;
    case "2020-2024":
      startYear = "2020-01-01";
      endYear = "2024-12-31";
      break;
    default:
      startYear = "";
      endYear = "";
  }
  return { startYear, endYear };

};
