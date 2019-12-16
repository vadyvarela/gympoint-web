import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import {
  studentsSearchRequest,
  studentsDeleteRequest,
} from '~/store/modules/students/actions';

export default function StudentList() {
  const [termSearch, setTermSearch] = useState('');
  const students = useSelector(state => state.student.students);
  const loading = useSelector(state => state.student.loading);
  const dispatch = useDispatch();

  console.log(students);

  useEffect(() => {
    dispatch(studentsSearchRequest({ name: termSearch, page: 1 }));
  }, []); // eslint-disable-line

  function handleSearchMain(value, page = 1) {
    setTermSearch(value);
    dispatch(studentsSearchRequest({ name: value, page }));
  }

  function handleDelete(id) {
    // Alert.delete().then(result => {
    //   if (result.value) {
    //     dispatch(studentsDeleteRequest(id));
    //   }
    // });
  }

  function handleLoadPage(page) {
    handleSearchMain(termSearch, page);
  }

  return students.mydata.map(student => (
    <ul key={String(student.id)}>
      <li>{student.name}</li>
      <li>{student.email}</li>
      <li align="center">{student.age}</li>

      <li />
    </ul>
  ));
}
