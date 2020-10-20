import React from "react";
import { useFormContext } from "react-hook-form";
import BirthdaySelect from "./BirthdaySelect";
import FileUploader from "../../components/FileUploader";
const MemberForm = ({ formLabel, sn, moreMember, showMore }) => {
  const { register, setValue } = useFormContext();

  register(
    { name: `birthday${sn}` },
    { required: `請正確選擇${formLabel}的出生年月日` }
  );
  register(
    { name: `member${sn}_upload1` },
    { required: `請上傳${formLabel}的正面圖檔` }
  );
  register(
    { name: `member${sn}_upload2` },
    { required: `請上傳${formLabel}的反面圖檔` }
  );

  const setBirthdayValue = (bday) => {
    setValue(`birthday${sn}`, bday);
  };
  return (
    <section className={`section_${sn}`} style={{ display: "block" }}>
      <div>
        <label htmlFor="">{formLabel} 姓名</label>
        <div>
          <input
            type="text"
            placeholder={`請填寫${formLabel} 的真實姓名`}
            className="name"
            name={`name${sn}`}
            ref={register({
              required: `請正確填寫${formLabel}的真實姓名．`,
              maxLength: {
                value: 40,
                message: `${formLabel}真實姓名長度過長．`,
              },
              minLength: {
                value: 2,
                message: `${formLabel}真實姓名長度過短．`,
              },
            })}
          />
        </div>
      </div>
      <div>
        <label htmlFor="">{formLabel} 出生日期</label>
        <i className="old"> &lt;選手須年滿 15 歲&gt; </i>
        <div>
          <BirthdaySelect setBirthdayValue={setBirthdayValue} />
        </div>
      </div>
      <div>
        <label htmlFor="">{formLabel} LINE ID</label>
        <div>
          <input
            type="text"
            placeholder={`請填寫${formLabel} 的Line_ID`}
            className="line_id"
            name={`line_id${sn}`}
            ref={register({
              required: `請正確填寫${formLabel}的LINE ID`,
            })}
          />
        </div>
      </div>
      <div>
        <label htmlFor="">{formLabel} Game ID</label>
        <div>
          <input
            type="text"
            placeholder={`請填寫${formLabel} 的Game_ID`}
            className="game_id"
            name={`game_id${sn}`}
            ref={register({
              required: `請正確填寫${formLabel}的Game_ID`,
            })}
          />
        </div>
      </div>
      <div>
        <label htmlFor="">角色</label>
        <div>
          <div
            className="input-radio"
            onClick={() => setValue(`role${sn}`, "1")}
          >
            <input
              type="radio"
              name={`role${sn}`}
              ref={register({
                required: `請選擇${formLabel}角色`,
              })}
              value="1"
              defaultChecked={false}
            />
            監管者{" "}
          </div>
          <div
            className="input-radio"
            onClick={() => setValue(`role${sn}`, "2")}
          >
            <input
              type="radio"
              name={`role${sn}`}
              ref={register({
                required: `請選擇${formLabel}角色`,
              })}
              value="2"
              defaultChecked={false}
            />
            求生者{" "}
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="">請上傳有效身分證</label>
        <div className="upload-text">
          {" "}
          規範與詳細描述請參考賽制規章 <br />
          可上傳兩張 JPG、PNG圖檔{" "}
        </div>
      </div>
      <div>
        <article>
          <div
            className="summoner-upload1 uploadImg"
            filename="file2_1_1"
            data-img="img2_1_1"
          >
            <FileUploader
              message={`點選上傳${formLabel}正面`}
              setFile={(name, value) => setValue(name, value)}
              filename={`member${sn}_upload1`}
            />
          </div>
        </article>
        <article>
          <div
            className="summoner-upload2 uploadImg"
            filename="file2_1_2"
            data-img="img2_1_2"
          >
            <FileUploader
              message={`點選上傳${formLabel}反面`}
              setFile={(name, value) => setValue(name, value)}
              filename={`member${sn}_upload2`}
            />
          </div>
        </article>
      </div>
      <p
        className={
          sn >= 4 && sn < 6 && showMore === sn
            ? "more"
            : sn === 6 && showMore === sn
            ? "close"
            : "empty"
        }
        onClick={() => moreMember(sn)}
      ></p>
    </section>
  );
};

export default MemberForm;
