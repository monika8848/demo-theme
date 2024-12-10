import { useRef, useState } from 'react';
import Link from 'next/link';
import { Overlay, Placeholder, Popover } from 'react-bootstrap';
import stylesHeader from '../../styles/components/header.module.scss';
import LinguisticsAndForex from './LinguisticsAndForex';

function CustomProductCategoriesNavbar({
  navbarData,
  isLoading,
  errorMessage,
  multiLanguagesData,
  selectedLang,
  handleLanguageChange,
}: any) {
  const [showPopoverIndex, setShowPopoverIndex] = useState<number | null>(null);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, index: number) => {
    setTarget(e.currentTarget);
    setShowPopoverIndex(index);
  };
  const handleMouseLeave = () => {
    setShowPopoverIndex(null);
  };
  const popoverBottom = (item: any) => (
    <Popover
      id={`popover-${item.label}`}
      className={`p-2  ${stylesHeader.category_popover} shadow rounded`}
      onMouseLeave={handleMouseLeave}
    >
      <div className="row">
        {item?.values?.length > 0 &&
          item?.values !== null &&
          item?.values.map((itemL2: any, index: number) => {
            const columnCount = Math.ceil(itemL2?.values?.length / 8);
            return (
              <div key={index} className="col">
                <div className={stylesHeader.heading_category_l2}>
                  <Link
                    href={{
                      pathname: `${itemL2?.url}`,
                      query: { page: '1', currency: 'INR' },
                    }}
                    className="label text-dark text-decoration-none navbar_category"
                    onClick={() => setShowPopoverIndex(null)}
                  >
                    {itemL2?.label}
                  </Link>
                </div>
                <div className={stylesHeader.col_container}>
                  {Array.from({ length: columnCount }, (_, columnIndex) => (
                    <div key={columnIndex} className={stylesHeader.column}>
                      {itemL2?.values?.slice(columnIndex * 8, (columnIndex + 1) * 8).map((itemL3: any, idx: number) => (
                        <div key={idx} className=" p-1">
                          <Link
                            href={{
                              pathname: `${itemL3?.url}`,
                              query: { page: '1', currency: 'INR' },
                            }}
                            className={stylesHeader.heading_category_l3}
                            onClick={() => setShowPopoverIndex(null)}
                          >
                            {itemL3?.label !== undefined ? itemL3?.label : `${idx}`}
                          </Link>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </Popover>
  );
  const handleDataRendering = () => {
    if (isLoading) {
      return <h4>Loading</h4>;
    }
    if (navbarData?.length > 0) {
      return (
        <header>
          <nav ref={ref} className="w-100">
            <div className={`theme-blue fw-bold fs-18 `} onMouseLeave={handleMouseLeave}>
              <div className="row w-100 d-flex justify-content-around">
                <div className="col-xl-10 col-lg-12 ">
                  <div className="d-flex ">
                    {navbarData?.length > 0 &&
                      navbarData.map((item: any, index: number) => (
                        <div key={index}>
                          {navbarData === null ? (
                            <Placeholder xs={6} bg="dark" />
                          ) : (
                            <div
                              className={`px-xxl-4 px-3  ${showPopoverIndex === index && 'theme-gold'}`}
                              onMouseEnter={(e) => handleMouseEnter(e, index)}
                            >
                              {item.label}
                            </div>
                          )}
                          <Overlay
                            show={showPopoverIndex === index && item?.values?.length > 0}
                            target={target}
                            placement="bottom"
                            container={ref.current}
                            containerPadding={20}
                          >
                            {popoverBottom(item)}
                          </Overlay>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      );
    }
  };

  return <header>{handleDataRendering()}</header>;
}

export default CustomProductCategoriesNavbar;
