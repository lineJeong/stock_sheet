import React from 'react'
import Tab from '../components/Tab'
import Table from '../components/Table'

function StockByType() {
  return (
    <>
      <Tab />
      <div className="mb-3">
        <p>위치</p>
      </div>
      <Table />
    </>
  )
}

export default StockByType