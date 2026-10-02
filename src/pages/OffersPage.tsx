import { Check, Copy, Percent, Sparkles, Tag } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { coupons, promoBanners } from "../data/deliveryOffers";
import { useDelivery } from "../hooks/useDeliveryState";

export function OffersPage() {
  const navigate = useNavigate();
  const { applyCoupon, cart } = useDelivery();
  const [copiedCode, setCopiedCode] = useState("");

  const handleCopyAndApply = (coupon: typeof coupons[0]) => {
    applyCoupon(coupon);
    setCopiedCode(coupon.code);
    setTimeout(() => setCopiedCode(""), 2500);
    if (cart.items.length > 0) {
      navigate("/cart");
    } else {
      navigate("/restaurants");
    }
  };

  const bankOffers = [
    {
      bank: "HDFC Bank Credit Cards",
      offer: "Flat ₹100 instant cashback on orders above ₹499",
      code: "HDFC100"
    },
    {
      bank: "ICICI Bank Netbanking",
      offer: "15% discount up to ₹120 on weekend family orders",
      code: "ICICI120"
    },
    {
      bank: "Paytm UPI",
      offer: "Guaranteed ₹30 to ₹75 cashback on first UPI transaction",
      code: "PAYTMUPI"
    },
    {
      bank: "Axis Bank Neo Card",
      offer: "Extra 20% OFF on all gourmet and partner dining meals",
      code: "AXISNEO"
    }
  ];

  return (
    <section className="section page" style={{ paddingTop: 30 }}>
      <div className="page-heading">
        <span className="kicker">Special Promotions</span>
        <h1>Offers & Coupons</h1>
        <p>Save big on your favorite meals with daily discount vouchers, bank deals, and free delivery.</p>
      </div>

      {/* Featured Promo Banners */}
      <div className="promo-grid">
        {promoBanners.map(p => (
          <div
            key={p.id}
            className="promo-card"
            style={{ background: p.bgGradient }}
            onClick={() => {
              const matchedCoupon = coupons.find(c => c.code === p.code);
              if (matchedCoupon) handleCopyAndApply(matchedCoupon);
            }}
          >
            <span className="promo-tag">{p.tag}</span>
            <h3>{p.title}</h3>
            <p>{p.subtitle}</p>
            <div className="promo-footer">
              <span className="promo-code-chip">{p.code}</span>
              <span className="promo-action">Apply & Order →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Restaurant Promo Coupons */}
      <div className="offers-section" style={{ marginTop: 45 }}>
        <h2>Available Discount Coupons</h2>

        <div className="coupons-grid">
          {coupons.map(coupon => {
            const isCopied = copiedCode === coupon.code;
            return (
              <div key={coupon.code} className="coupon-detail-card">
                <div className="coupon-left">
                  <div className="coupon-tag-badge">
                    <Tag size={16} />
                    <span>{coupon.code}</span>
                  </div>
                  <h3>{coupon.title}</h3>
                  <p>{coupon.description}</p>
                </div>

                <div className="coupon-right">
                  <button
                    className="primary compact"
                    onClick={() => handleCopyAndApply(coupon)}
                  >
                    {isCopied ? (
                      <>
                        <Check size={16} /> Applied!
                      </>
                    ) : (
                      "Apply & Shop"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bank & Payment Partner Deals */}
      <div className="offers-section" style={{ marginTop: 50 }}>
        <h2>Bank & Wallet Offers</h2>
        <div className="bank-deals-grid">
          {bankOffers.map(b => (
            <div key={b.bank} className="bank-deal-card">
              <div className="bank-header">
                <b>{b.bank}</b>
                <span className="code-pill">{b.code}</span>
              </div>
              <p>{b.offer}</p>
              <small>Valid on checkout when paying with eligible payment method</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
