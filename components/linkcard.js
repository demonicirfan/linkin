import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useStateValue } from "../pages/context/state";

import debounce from "lodash.debounce";

const endpoint =
  process.env.NODE_ENV === "production" ? `` : "http://localhost:3000";
export default function LinkCard({ index }) {
  const [loading, setloading] = useState(false);
  const [{ links }, dispatch] = useStateValue();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm({ defaultValues: links[index] });
  // const [linkData, setlinkData] = useState(item);

  // useEffect(() => {
  //   reset(links[index]);
  //   // dispatch({ type: "changeTheme", linkdata: linkDataSS });
  // }, [links]);

  // highlight-starts
  const debouncedSave = useCallback(
    debounce((nextValue) => saveToDb(nextValue), 1000),
    [] // will be created only once initially
  );
  // highlight-ends

  const saveToDb = (nextValue) => {
    console.log(nextValue);
    saveLinkDataPost(nextValue);
  };

  watch((data) => {
    console.log(data);
    debouncedSave(data);
  });

  const saveLinkDataPost = async (linkdata) => {
    console.log("links linkdata");
    console.log(linkdata);
    setloading(true);
    // setshowAlert({
    //   msg: "",
    //   type: "",
    // });

    let operation = "insertpagelinks";
    if (linkdata.hasOwnProperty("id")) {
      operation = `updatepagelinks`;
    }
    console.log(operation);
    try {
      let res = await fetch(`${endpoint}/api/${operation}`, {
        method: "POST",
        body: JSON.stringify(linkdata),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());

      // setshowAlert({
      //   msg:
      //     operation === "insertpagelinks"
      //       ? "Added new page link "
      //       : "Updated page link " + " successfully",
      //   type: "success",
      // });
      console.log(res);
      // updatedLinkData(res.updatedLinkData);
      dispatch({ type: "changeTheme", linkdata: res.updatedLinkData });
      // reset(res.updatedLinkData[index]);
    } catch (error) {
      // setshowAlert({
      //   msg: operation + "failed" + error.message,
      //   type: "danger",
      // });
    }
    setloading(false);
  };

  useEffect(() => {
    console.log("111111-link card-11111111");
    // reset(item);
  }, [links]);

  const saveLinkData = (data) => {
    // save(data);
    // reset(data);
  };

  return (
    <>
      <div className="card mt-3">
        <div className="card-body">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-check form-switch d-grid gap-2 d-md-flex justify-content-md-end">
              <input
                className="form-check-input"
                type="checkbox"
                {...register(`active`)}
              />
              {/* <label className="form-check-label" for="flexSwitchCheckDefault">
                active
              </label> */}
            </div>
            <div className="mb-3 small">
              <label className="form-label">Link Display Text</label>
              <input
                type="text"
                className={
                  errors.handlerText
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Enter name"
                {...register(`displayText`)}
              />
            </div>
            <div className="mb-3 small">
              <label className="form-label">Enter Link Url</label>
              <input
                type="text"
                className={
                  errors.handlerText
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Enter link"
                {...register(`linkUrl`)}
              />
            </div>
            <div className="mb-3 small">
              <label className="form-label">Icon Class</label>
              <input
                type="text"
                className={
                  errors.handlerText
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Enter Icon Class"
                {...register(`iconClass`)}
              />
            </div>
            <div className="mb-3 ">
              <label className="form-label">Handler Font color </label>
              <input
                type="color"
                className="form-control form-control-color"
                title="Choose Link background color"
                {...register("bgColor")}
              />
            </div>{" "}
            {/* <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                className="btn btn-outline-warning btn-sm"
                type="button"
                disabled={!isDirty}
                hidden={!isDirty}
                onClick={() => {
                  reset({}, { keepDefaultValues: true });
                }}
              >
                Revert
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-block btn-sm"
                onClick={handleSubmit(saveLinkData)}
                disabled={!isDirty || loading}
                hidden={!isDirty}
              >
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm me-1"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Save
              </button>
            </div> */}
          </form>
        </div>{" "}
      </div>

      {/* <div class="card">
        <div class="card-body">
          <div className="mb-3 small">
            <label className="form-label">Name</label>
            <input
              type="text"
              className={
                errors.handlerText ? "form-control is-invalid" : "form-control"
              }
              placeholder="Enter Handler name"
              {...register("name")}
            />
          </div>
          <div className="mb-3 small">
            <label className="form-label">Link</label>
            <input
              type="text"
              className={
                errors.handlerText ? "form-control is-invalid" : "form-control"
              }
              placeholder="Enter Handler name"
              {...register("link")}
            />
          </div>
        </div>
      </div> */}
    </>
  );
}
