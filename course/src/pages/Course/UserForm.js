import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';

import moment from 'moment';
import axios from 'axios';
const UserForm = ({ setRegisterResult, courseId, setError }) => {
  const [loading, setLoading] = useState(false);

  const [timeSlotList, setTimeSlotList] = useState([]);
  //const [registerResult, setRegisterResult] = useState(null);

  const { register, handleSubmit, errors, watch } = useForm(); // initialise the hook
  const watchDateChange = watch('date', false);
  useEffect(() => {
    //console.log('watchDateChange', watchDateChange);
    if (watchDateChange) {
      //const criteria = { courseId: 'A', date: '2020-09-19' };
      axios
        .post('/api/course/seatsByDate', {
          date: watchDateChange,
          courseId,
        })
        .then((res) => {
          // [
          //   {
          //     timeSlot: '18:00~19:00',
          //     available: 0,
          //     reason: '已經額滿或是已經預定課程',
          //   },
          // ];

          setTimeSlotList(res.data.seatsAvailable);
        });
    }
  }, [watchDateChange, courseId]);

  const onSubmit = (registerData) => {
    //console.log(registerData);
    setLoading(true);
    axios
      .post('/api/course/register', {
        ...registerData,
        courseId,
      })
      .then((res) => {
        setLoading(false);
        //console.log("result", res.data);
        setRegisterResult(res.data.CourseRegister);
        //const result = res.data;
        //const newId = result._id;

        //history.push(`/general?category=&id=${res.data._id}`);
      })
      .catch((err) => {
        setLoading(false);
        //console.log(err.response.data);
        setError(err.response.data);
      });
  };

  // if (loading) {
  //   return <i className="fas fa-spinner"></i>;
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='modal-body'>
        <div>
          <h6>請選擇您要預約的課程日期與時段</h6>
          <div className=''>
            <input
              type='date'
              name='date'
              ref={register({
                required: '請選擇日期．',
              })}
              min={moment().add(7, 'day').format('YYYY-MM-DD').toString()}
              max='2020-10-31'
              className='form-control'
              id='datepicker'
              placeholder='請選擇預約的日期'
            />
          </div>
          <select
            className='custom-select form-control'
            name='timeSlot'
            ref={register({
              required: '請選擇時段．',
            })}>
            <option value=''>請選擇預約時段</option>
            {timeSlotList.length > 0 &&
              timeSlotList.map((ts) => (
                <option
                  key={`tsopt-${ts.timeSlot}`}
                  value={ts.timeSlot}
                  disabled={ts.available === 0 ? true : false}>
                  {ts.timeSlot}
                  (尚有名額:{ts.available} {ts.reason})
                </option>
              ))}
          </select>
          <span
            className={classnames('', {
              'text-orange': errors.timeSlot,
            })}>
            {errors.timeSlot?.message}
          </span>{' '}
          <br />
          <span>
            ✦提醒您，每個時段將實際與西區組隊進行一局遊戲，一局結束後，將針對該局進行分析與教學
          </span>
          <h6>請填寫您的Discord帳號</h6>
          <input
            type='text'
            id='discordAccount'
            name='discordAccount'
            placeholder='xxxxxxxxx'
            ref={register({
              required: 'Discord帳號必填．',
              maxLength: 20,
            })}
            className={classnames('form-control', {
              'not-valid': errors.discordAccount,
            })}
          />
          <span
            className={classnames('', {
              'text-orange': errors.discordAccount,
            })}>
            ✦ {errors.discordAccount?.message}
            我們將於您預約與付款成功後，加入教學群組{' '}
          </span>
          <h6>請填寫您的基本資料</h6>
          <div className='form-group row'>
            <div className='col-lg-12'>
              <input
                type='name'
                className='form-control'
                id='inputname'
                name='name'
                placeholder='姓名'
                ref={register({
                  required: '姓名必填．',
                  maxLength: 20,
                })}
              />
              <span
                className={classnames('', {
                  'text-orange': errors.name,
                })}>
                {errors.name?.message}
              </span>
              <input
                type='phone'
                className='form-control'
                id='inputphone'
                name='phone'
                placeholder='電話'
                ref={register({
                  required: '電話必填．',
                  maxLength: 20,
                })}
              />
              <span
                className={classnames('', {
                  'text-orange': errors.phone,
                })}>
                {errors.phone?.message}
              </span>
              <input
                type='email'
                className='form-control'
                id='inputEmail'
                name='email'
                placeholder='信箱'
                ref={register({
                  required: '輸入您的電子郵件',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: '電子郵件格式不符合',
                  },
                })}
              />
              <span
                className={classnames('', {
                  'text-orange': errors.email,
                })}>
                {errors.email?.message}
              </span>
              <input
                type='number'
                className='form-control'
                id='inputgrade'
                name='level'
                placeholder='第五人格等級'
                ref={register({
                  required: '等級必填．',
                  min: { value: 1, message: '等級不符合範圍' },
                  max: {
                    value: 99,
                    message: '等級不符合範圍',
                  },
                })}
              />
              <span
                className={classnames('', {
                  'text-orange': errors.level,
                })}>
                {errors.level?.message}
              </span>
              <select
                className='custom-select form-control'
                name='rank'
                ref={register({
                  required: '請選擇位階．',
                })}>
                <option value=''>請選擇位階</option>
                <option value='1'>一階</option>
                <option value='2'>二階</option>
                <option value='3'>三階</option>
                <option value='4'>四階</option>
                <option value='5'>五階</option>
                <option value='6'>六階</option>
              </select>

              <span
                className={classnames('', {
                  'text-orange': errors.rank,
                })}>
                {errors.rank?.message}
              </span>
            </div>
          </div>
        </div>
        {loading === false ? (
          <button type='submit' className='btn btn-primary'>
            確認預約
          </button>
        ) : (
          <button type='button' className='btn btn-primary' disabled>
            傳送資料中...
          </button>
        )}

        <a className='btn btn-primary' href='/course'>
          匯款成功回報
        </a>
      </div>
    </form>
  );
};

export default UserForm;
