import { DailyPriceFilter } from "./dailyPriceFilter";

export class Filters {
    brandFilters: string[] = [];
    colorFilters: string[] = [];
    modelYearFilters: string[] = [];
    dailyPriceFilters: DailyPriceFilter = new DailyPriceFilter();
}