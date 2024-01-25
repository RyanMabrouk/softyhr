import { SelectGeneric } from "@/app/_ui/SelectGeneric";
const month_name = "accure_refresh_start_month";
const day_name = "accure_refresh_start_day";
const weekday_name = "accure_refresh_start_weekday";
export const days_of_the_week = [
  { label: "Sunday", value: "1" },
  { label: "Monday", value: "2" },
  { label: "Tuesday", value: "3" },
  { label: "Wednesday", value: "4" },
  { label: "Thursday", value: "5" },
  { label: "Friday", value: "6" },
  { label: "Saturday", value: "7" },
];
export const months = [
  { label: "January", value: "1" },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];
const first_15_days_of_the_month = Array.from({ length: 15 }).map((e, i) => {
  switch (i) {
    case 0:
      var label = i + 1 + "st";
      break;
    case 1:
      var label = i + 1 + "nd";
      break;
    case 2:
      var label = i + 1 + "rd";
      break;
    default:
      var label = i + 1 + "th";
      break;
  }
  return {
    label,
    value: `${i + 1}`,
  };
});
const last_15_days_of_the_month = Array.from({ length: 15 }).map((e, i) => {
  switch (i) {
    case 6:
      var label = i + 16 + "st";
      break;
    case 7:
      var label = i + 16 + "nd";
      break;
    case 8:
      var label = i + 16 + "rd";
      break;
    case 14:
      var label = "Last day";
      break;
    default:
      var label = i + 16 + "th";
      break;
  }
  return {
    label,
    value: `${i + 16}`,
  };
});
export const days_of_the_month = [
  ...first_15_days_of_the_month,
  ...last_15_days_of_the_month,
];
type accural_refresh_options_type = {
  label: string;
  value: string;
  extra: JSX.Element;
};
const DaysOfTheMonthSelect = () => (
  <SelectGeneric
    className="!max-w-[5rem]"
    defaultValue={{
      label: "1st",
      value: "1",
    }}
    required
    name={day_name}
    options={[...first_15_days_of_the_month, ...last_15_days_of_the_month]}
  />
);
const accural_refresh_options: accural_refresh_options_type[] = [
  { label: "Daily", value: "daily", extra: <></> },
  {
    label: "Weekly",
    value: "weekly",
    extra: (
      <>
        <span>on</span>
        <SelectGeneric
          required
          className="!max-w-[10rem]"
          defaultValue={days_of_the_week[0]}
          name={weekday_name}
          options={days_of_the_week}
        />
      </>
    ),
  },
  {
    label: "Twice a month",
    value: "twice_a_month",
    extra: (
      <>
        <span>on the</span>
        <SelectGeneric
          required
          className="!max-w-[5rem]"
          defaultValue={first_15_days_of_the_month[0]}
          name={day_name}
          options={first_15_days_of_the_month}
        />
        <span>and</span>
        <SelectGeneric
          required
          className="!max-w-[5rem]"
          defaultValue={last_15_days_of_the_month[0]}
          name={day_name}
          options={last_15_days_of_the_month}
        />
      </>
    ),
  },
  {
    label: "Monthly",
    value: "monthly",
    extra: (
      <>
        <span>on the</span>
        <DaysOfTheMonthSelect />
      </>
    ),
  },
  {
    label: "Twice a year",
    value: "twice_a_year",
    extra: (
      <div className="flex flex-col gap-2">
        <section className="flex flex-row items-center gap-1.5">
          <span>on the</span>
          <DaysOfTheMonthSelect />
          <span>day of</span>
          <SelectGeneric
            required
            className="!max-w-[10rem]"
            name={month_name}
            defaultValue={{ label: "January", value: "1" }}
            options={[
              { label: "January", value: "1" },
              { label: "February", value: "2" },
              { label: "March", value: "3" },
              { label: "April", value: "4" },
              { label: "May", value: "5" },
              { label: "June", value: "6" },
            ]}
          />
          <span>and..</span>
        </section>
        <section className="flex flex-row items-center gap-1.5">
          <span>on the</span>
          <DaysOfTheMonthSelect />
          <span>day of</span>
          <SelectGeneric
            required
            className="!max-w-[10rem]"
            name={month_name}
            defaultValue={{ label: "July", value: "7" }}
            options={[
              { label: "July", value: "7" },
              { label: "August", value: "8" },
              { label: "September", value: "9" },
              { label: "October", value: "10" },
              { label: "November", value: "11" },
              { label: "December", value: "12" },
            ]}
          />
        </section>
      </div>
    ),
  },
  {
    label: "Quarterly",
    value: "quarterly",
    extra: (
      <div className="flex flex-col justify-center gap-2">
        <section className="flex flex-row items-center gap-1.5">
          <span>on the</span>
          <DaysOfTheMonthSelect />
          <span>day of</span>
          <SelectGeneric
            required
            className="!max-w-[10rem]"
            name={month_name}
            defaultValue={{ label: "January", value: "1" }}
            options={[
              { label: "January", value: "1" },
              { label: "February", value: "2" },
              { label: "March", value: "3" },
            ]}
          />
          <span>and..</span>
        </section>
        <section className="flex flex-row items-center gap-1.5">
          <span>on the</span>
          <DaysOfTheMonthSelect />
          <span>day of</span>
          <SelectGeneric
            required
            className="!max-w-[10rem]"
            name={month_name}
            defaultValue={{ label: "April", value: "4" }}
            options={[
              { label: "April", value: "4" },
              { label: "May", value: "5" },
              { label: "June", value: "6" },
            ]}
          />
          <span>and..</span>
        </section>
        <section className="flex flex-row items-center gap-1.5">
          <span>on the</span>
          <DaysOfTheMonthSelect />
          <span>day of</span>
          <SelectGeneric
            required
            className="!max-w-[10rem]"
            name={month_name}
            defaultValue={{ label: "July", value: "7" }}
            options={[
              { label: "July", value: "7" },
              { label: "August", value: "8" },
              { label: "September", value: "9" },
            ]}
          />
          <span>and..</span>
        </section>
        <section className="flex flex-row items-center gap-1.5">
          <span>on the</span>
          <DaysOfTheMonthSelect />
          <span>day of</span>
          <SelectGeneric
            required
            className="!max-w-[10rem]"
            name={month_name}
            defaultValue={{ label: "October", value: "10" }}
            options={[
              { label: "October", value: "10" },
              { label: "November", value: "11" },
              { label: "December", value: "12" },
            ]}
          />
        </section>
      </div>
    ),
  },
  {
    label: "Yearly",
    value: "yearly",
    extra: (
      <>
        <span>on the</span>
        <DaysOfTheMonthSelect />
        <span>day of</span>
        <SelectGeneric
          required
          className="!max-w-[10rem]"
          name={month_name}
          defaultValue={{ label: "January", value: "1" }}
          options={[
            { label: "January", value: "1" },
            { label: "February", value: "2" },
            { label: "March", value: "3" },
            { label: "April", value: "4" },
            { label: "May", value: "5" },
            { label: "June", value: "6" },
            { label: "July", value: "7" },
            { label: "August", value: "8" },
            { label: "September", value: "9" },
            { label: "October", value: "10" },
            { label: "November", value: "11" },
            { label: "December", value: "12" },
          ]}
        />
      </>
    ),
  },
];
//----------------------------------------------------------------
const carryover_date_options = [
  { label: "1st of January", value: "1st_january", extra: <></> },
  {
    label: "Employee Hire Date",
    value: "hire_date",
    extra: <></>,
  },
  {
    label: "Other..",
    value: "other",
    extra: (
      <div className="flex flex-row items-center gap-1.5">
        <span>on the</span>
        <SelectGeneric
          required
          className="!max-w-[5rem]"
          defaultValue={first_15_days_of_the_month[0]}
          name={"carryover_date_day"}
          options={[
            ...first_15_days_of_the_month,
            ...last_15_days_of_the_month,
          ]}
        />
        <span>day of</span>
        <SelectGeneric
          required
          className="!max-w-[10rem]"
          name={"carryover_date_month"}
          defaultValue={{ label: "January", value: "1" }}
          options={[
            { label: "January", value: "1" },
            { label: "February", value: "2" },
            { label: "March", value: "3" },
            { label: "April", value: "4" },
            { label: "May", value: "5" },
            { label: "June", value: "6" },
            { label: "July", value: "7" },
            { label: "August", value: "8" },
            { label: "September", value: "9" },
            { label: "October", value: "10" },
            { label: "November", value: "11" },
            { label: "December", value: "12" },
          ]}
        />
      </div>
    ),
  },
];
export { carryover_date_options, accural_refresh_options };
