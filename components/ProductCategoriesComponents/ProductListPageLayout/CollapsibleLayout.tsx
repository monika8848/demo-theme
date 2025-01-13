import { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { IoFunnel } from 'react-icons/io5';
import LeftWebFilter from '../ProductListingViewWithLeftFilterDrawer/LeftWebFilter';
import ProductListingWithLeftFilterDrawerMaster from '../ProductListingViewWithLeftFilterDrawer/ProductListingWithLeftFilterDrawerMaster';
import useProductListingFilterHook from '../../../hooks/ProductListPageHooks/useProductListFilterHook';

function CollapsibleLayout({
  isLoading,
  productListingData,
  handlePaginationBtn,
  pageOffset,
  handlePageClick,
  productListTotalCount,
  wishlistData,
  isSuperAdmin,
  handleShowCatalogModal,
  handleDeleteCatalogItem,
  cartData,
}: any) {
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  const handleFilterOpen = () => setShowFilterDrawer(true);
  const handleFilterClose = () => setShowFilterDrawer(false);

  const { filtersData, isLoading: filterLoading, errorMessage, handleFilterCheckFun, selectedFilters } = useProductListingFilterHook();

  return (
    <div className="row mx-sm-0">
      {/* Filter Button */}
      <div className="py-2 px-lg-0 d-flex align-items-center cursor-pointer" onClick={handleFilterOpen}>
        <IoFunnel size={17} color="#595959" />
        <span className="ps-1 text-secondary fs-15 pt-1">Filter</span>
      </div>
      {/* Left Drawer for Filters */}
      <Offcanvas show={showFilterDrawer} onHide={handleFilterClose} placement="start">
        <Offcanvas.Header closeButton className="py-2 mt-1">
          <Offcanvas.Title>
            <span className="text-uppercase ps-2 fs-16">Filter</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <hr className="m-0" />
        <Offcanvas.Body className="px-0">
          <LeftWebFilter
            filtersData={filtersData}
            isLoading={filterLoading}
            errorMessage={errorMessage}
            handleFilterCheckFun={handleFilterCheckFun}
            selectedFilters={selectedFilters}
          />
        </Offcanvas.Body>
      </Offcanvas>
      {/* Product Listing */}
      <div className="container-md col-12 p-lg-0">
        <div className="row mt-2 product-listing-row">
          <ProductListingWithLeftFilterDrawerMaster
            productListingData={productListingData}
            handlePaginationBtn={handlePaginationBtn}
            productListTotalCount={productListTotalCount}
            pageOffset={pageOffset}
            handlePageClick={handlePageClick}
            wishlistData={wishlistData}
            isLoading={isLoading}
            isSuperAdmin={isSuperAdmin}
            handleShowCatalogModal={handleShowCatalogModal}
            handleDeleteCatalogItem={handleDeleteCatalogItem}
            cartData={cartData}
          />
        </div>
      </div>
    </div>
  );
}

export default CollapsibleLayout;
