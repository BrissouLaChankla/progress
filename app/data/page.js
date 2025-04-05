import Data from "@/models/Data";
import connect from "@/models/connect";
export const revalidate = 43200;

export default async function page() {
  await connect();
  const data = await Data.find().lean();

  const showDiff = (val) => {
    if (isNaN(val)) {
      return;
    }

    if (val > 0) {
      return (
        <span className="text-success/60 flex gap-0.5 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
            />
          </svg>
          +{val}
        </span>
      );
    } else if (val < 0) {
      return (
        <span className="text-error/60 flex gap-0.5 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"
            />
          </svg>
          {val}
        </span>
      );
    } else {
      return "=";
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-10 lg:mt-20 ">
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Date</th>
              <th>Chess (elo)</th>
              <th>Duolingo (xp)</th>
              <th>Money (€)</th>
              <th>Sport (séances)</th>
            </tr>
          </thead>
          <tbody>
            {data.reverse().map((el, i, arr) => (
              <tr key={el._id}>
                <th>{i + 1}</th>
                <td>{new Date(el.date).toLocaleDateString("FR")}</td>
                <td>
                  <div className="flex gap-1 items-center">
                    <span className="font-medium"> {el.chess}</span>{" "}
                    <small>{showDiff(el.chess - arr[i + 1]?.chess)}</small>
                  </div>
                </td>
                <td>
                  <div className="flex gap-1 items-center">
                    <span className="font-medium"> {el.duolingo}</span>{" "}
                    <small>
                      {showDiff(el.duolingo - arr[i + 1]?.duolingo)}
                    </small>
                  </div>
                </td>
                <td>
                  <div className="flex gap-1 items-center">
                    <span className="font-medium"> {Math.round(el.money)}</span>{" "}
                    <small>
                      {showDiff(
                        Math.round(el.money) - Math.round(arr[i + 1]?.money)
                      )}
                    </small>
                  </div>
                </td>

                <td>
                  <div className="flex gap-1 items-center">
                    <span className="font-medium"> {el.sport}</span>{" "}
                    <small>{showDiff(el.sport - arr[i + 1]?.sport)}</small>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
