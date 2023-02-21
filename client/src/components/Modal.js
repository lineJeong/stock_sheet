import { useCallback, useState } from 'react'
import { DROPDOWN_CONTENT } from '../static/constant'
import useOutSideRef from '../util/useOutSideRef'
import Dropdown from './Dropdown'

function Modal({ toggleModal }) {
  const today = `${new Date().getFullYear()}-${String(
    new Date().getMonth() + 1
  ).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`

  const { category, type, pattern, quantity, storage, storageFrom, storageTo } =
    DROPDOWN_CONTENT
  const [isStockMove, setIsStockMove] = useState(false)
  const [date, setDate] = useState(today)
  const [selected, setSelected] = useState({
    category: '선택하세요.',
    type: '선택하세요.',
    pattern: '선택하세요.',
    quantity: '선택하세요.',
    storage: '선택하세요.',
    storageFrom: '선택하세요.',
    storageTo: '선택하세요.'
  })

  const [categoryRef, isCategoryOpen, setIsCategoryOpen] = useOutSideRef(false)
  const [typeRef, isTypeOpen, setIsTypeOpen] = useOutSideRef(false)
  const [patternRef, isPatternOpen, setIsPatternOpen] = useOutSideRef(false)
  const [quantityRef, isQuantityOpen, setIsQuantityOpen] = useOutSideRef(false)
  const [storageRef, isStorageRef, setIsStorageOpen] = useOutSideRef(false)
  const [storageFromRef, isStorageFromRef, setIsStorageFromOpen] =
    useOutSideRef(false)
  const [storageToRef, isStorageToRef, setIsStorageToOpen] =
    useOutSideRef(false)

  const dropdownCommonMapping = [
    {
      outsideRef: typeRef,
      isOpen: isTypeOpen,
      setIsOpen: setIsTypeOpen,
      content: type,
      selected: selected.type
    },
    {
      outsideRef: patternRef,
      isOpen: isPatternOpen,
      setIsOpen: setIsPatternOpen,
      content: pattern,
      selected: selected.pattern
    },
    {
      outsideRef: quantityRef,
      isOpen: isQuantityOpen,
      setIsOpen: setIsQuantityOpen,
      content: quantity,
      selected: selected.quantity
    }
  ]

  // 구분(category) 제외 (map으로 돌리지 않고 따로 배치)
  const dropdownMapping = isStockMove
    ? [
        ...dropdownCommonMapping,
        {
          outsideRef: storageFromRef,
          isOpen: isStorageFromRef,
          setIsOpen: setIsStorageFromOpen,
          content: storageFrom,
          selected: selected.storageFrom
        },
        {
          outsideRef: storageToRef,
          isOpen: isStorageToRef,
          setIsOpen: setIsStorageToOpen,
          content: storageTo,
          selected: selected.storageTo
        }
      ]
    : [
        ...dropdownCommonMapping,
        {
          outsideRef: storageRef,
          isOpen: isStorageRef,
          setIsOpen: setIsStorageOpen,
          content: storage,
          selected: selected.storage
        }
      ]

  const handleClickModalView = (e) => {
    e.stopPropagation()
    for (let i = 0; i < dropdownMapping.length; i++) {
      if (dropdownMapping[i].isOpen) {
        dropdownMapping[i].setIsOpen(false)
      } else if (isCategoryOpen) {
        setIsCategoryOpen(false)
      }
    }
  }

  const handleChangeDate = (e) => {
    setDate(e.target.value)
  }

  const checkIsStockMove = useCallback((data) => {
    // 🐹 setter 함수에 의한 상태 변화 반영 속도 고려 => 추후 필요 시, 동기처리 할 것
    if (data === '재고 이동') {
      return setIsStockMove(true)
    }
    return setIsStockMove(false)
  }, [])

  const selectOption = useCallback(
    (data, key) => {
      if (key === DROPDOWN_CONTENT.category.key) {
        checkIsStockMove(data)
        setSelected({
          category: data,
          type: '선택하세요.',
          pattern: '선택하세요.',
          quantity: '선택하세요.',
          storage: '선택하세요.',
          storageFrom: '선택하세요.',
          storageTo: '선택하세요.'
        })
      } else {
        setSelected((prev) => ({ ...prev, [key]: data }))
      }
    },
    [checkIsStockMove]
  )

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-10 bg-modalBg"
      onClick={toggleModal}
    >
      <div
        className="px-6 py-8 bg-white rounded-md min-w-[30rem]"
        onClick={handleClickModalView}
      >
        <div className="mb-10">
          <div className="mb-2">
            <span className="font-bold mr-3">일자</span>
            <input
              className="border border-[#D5DBE2] rounded h-7 min-w-[8rem] pl-3 py-1"
              type="date"
              value={date}
              onChange={handleChangeDate}
            />
          </div>
          <Dropdown
            outsideRef={categoryRef}
            isOpen={isCategoryOpen}
            setIsOpen={setIsCategoryOpen}
            content={category}
            checkIsStockMove={checkIsStockMove}
            selected={selected.category}
            selectOption={selectOption}
          />
        </div>
        <div
          className={`grid grid-cols-2 ${
            isStockMove ? 'md:grid-cols-3' : 'md:grid-cols-4'
          } md:gap-4 place-items-center`}
        >
          {dropdownMapping.map((obj, i) => (
            <Dropdown
              key={i}
              outsideRef={obj.outsideRef}
              isOpen={obj.isOpen}
              setIsOpen={obj.setIsOpen}
              content={obj.content}
              checkIsStockMove={checkIsStockMove}
              selected={obj.selected}
              selectOption={selectOption}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button className="mx-2 px-6 py-1 rounded-md bg-[#074073] text-white font-semibold">
            저장하기
          </button>
          <button
            className="mx-2 px-6 py-1 border rounded-md font-semibold"
            onClick={toggleModal}
          >
            취소하기
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
