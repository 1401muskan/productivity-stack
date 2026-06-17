interface Props {
  label: string;
  hour: string;
  minute: string;
  period: string;
  setHour: (v: string) => void;
  setMinute: (v: string) => void;
  setPeriod: (v: string) => void;
}

export default function TimePicker({
  label,
  hour,
  minute,
  period,
  setHour,
  setMinute,
  setPeriod,
}: Props) {
  return (
    <div>
      <label
        className="
          text-sm
          text-zinc-400
          block
          mb-2
        "
      >
        {label}
      </label>

      <div className="flex gap-2">

        <select
          value={hour}
          onChange={(e) =>
            setHour(
              e.target.value
            )
          }
          className="
            bg-zinc-800
            border
            border-zinc-700
            rounded-xl
            p-3
            text-white
          "
        >
          {Array.from(
            { length: 12 },
            (_, i) => (
              <option
                key={i + 1}
                value={String(
                  i + 1
                ).padStart(
                  2,
                  "0"
                )}
              >
                {String(
                  i + 1
                ).padStart(
                  2,
                  "0"
                )}
              </option>
            )
          )}
        </select>

        <select
          value={minute}
          onChange={(e) =>
            setMinute(
              e.target.value
            )
          }
          className="
            bg-zinc-800
            border
            border-zinc-700
            rounded-xl
            p-3
            text-white
          "
        >
          {Array.from(
            { length: 60 },
            (_, i) => (
              <option
                key={i}
                value={String(
                  i
                ).padStart(
                  2,
                  "0"
                )}
              >
                {String(
                  i
                ).padStart(
                  2,
                  "0"
                )}
              </option>
            )
          )}
        </select>

        <select
          value={period}
          onChange={(e) =>
            setPeriod(
              e.target.value
            )
          }
          className="
            bg-zinc-800
            border
            border-zinc-700
            rounded-xl
            p-3
            text-white
          "
        >
          <option>
            AM
          </option>

          <option>
            PM
          </option>
        </select>

      </div>
    </div>
  );
}