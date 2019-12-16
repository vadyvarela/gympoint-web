import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import {
  studentsSearchRequest,
  studentsDeleteRequest,
} from '~/store/modules/students/actions';
import Pagination from '~/components/Pagination';
import PaginationInfo from '~/components/Pagination/PaginationInfo';

export default function StudentList() {
  const [termSearch, setTermSearch] = useState('');
  const students = useSelector(state => state.student.students);
  const loading = useSelector(state => state.student.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(studentsSearchRequest({ name: termSearch, page: 1 }));
  }, []); // eslint-disable-line

  function handleSearchMain(value, page = 1) {
    setTermSearch(value);
    dispatch(studentsSearchRequest({ name: value, page }));
  }

  console.log(students);

  // function handleDelete(id) {
  //   Alert.delete().then(result => {
  //     if (result.value) {
  //       dispatch(studentsDeleteRequest(id));
  //     }
  //   });
  // }

  // function handleLoadPage(page) {
  //   handleSearchMain(termSearch, page);
  // }
}
