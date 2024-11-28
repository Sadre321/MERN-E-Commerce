import React from 'react'
import './Policy.css'

const Policy = () => {
  return (
    <section class="policy">
    <div class="container">
      <ul class="policy-list">
        <li class="policy-item">
          <i class="bi bi-truck"></i>
          <div class="policy-texts">
            <strong>FREE DELIVERY</strong>
            <span>From $59.89</span>
          </div>
        </li>
        <li class="policy-item">
          <i class="bi bi-headset"></i>
          <div class="policy-texts">
            <strong>SUPPORT 24/7</strong>
            <span>Online 24 hours</span>
          </div>
        </li>
        <li class="policy-item">
          <i class="bi bi-arrow-clockwise"></i>
          <div class="policy-texts">
            <strong> 30 DAYS RETURN</strong>
            <span>Simply return it within 30 days</span>
          </div>
        </li>
        <li class="policy-item">
          <i class="bi bi-credit-card"></i>
          <div class="policy-texts">
            <strong> PAYMENT METHOD</strong>
            <span>Secure Payment</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
  )
}

export default Policy