export const STARTER_TOPPINGS = [
  {
    "name": "Hạt sen",
    "price": 10000,
    "sortOrder": 1,
    "isActive": true
  },
  {
    "name": "Trân châu trắng",
    "price": 5000,
    "sortOrder": 2,
    "isActive": true
  },
  {
    "name": "Trân châu đen",
    "price": 5000,
    "sortOrder": 3,
    "isActive": true
  },
  {
    "name": "Thạch nổ củ năng",
    "price": 10000,
    "sortOrder": 4,
    "isActive": true
  },
  {
    "name": "Thạch nha đam",
    "price": 5000,
    "sortOrder": 5,
    "isActive": true
  },
  {
    "name": "Thạch dừa",
    "price": 5000,
    "sortOrder": 6,
    "isActive": true
  },
  {
    "name": "Thạch nổ đậu đỏ",
    "price": 5000,
    "sortOrder": 7,
    "isActive": true
  },
  {
    "name": "Trân châu ô long",
    "price": 5000,
    "sortOrder": 8,
    "isActive": true
  }
] as const;

export const STARTER_MENU = [
  {
    "name": "Món mới siêu đỉnh",
    "sortOrder": 1,
    "items": [
      {
        "name": "Sữa Dâu Sấy Trăng Hoa",
        "description": "Món sữa dâu sấy trăng hoa với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774532850278-2340386c-68ff-48c4-8862-c6ef3355ca1e-s-a-d-u-s-y-th-ng-hoa.webp",
        "isAvailable": true,
        "sortOrder": 1,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sữa Chua Dẻo Cốm Xoài Trân Châu",
        "description": "Món sữa chua dẻo cốm xoài trân châu với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774533573995-6221874f-dbc8-457c-8fe1-f10ef5de6636-s-a-chua-d-o-c-m-xo-i-tr-n-ch-u.webp",
        "isAvailable": true,
        "sortOrder": 2,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Dưa Hấu Đá Sayy - Sinh Tố Dưa Hấu Siêu Hot",
        "description": "Món dưa hấu đá sayy - sinh tố dưa hấu siêu hot với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774533581206-e4295c54-3bc8-4c4c-9c13-edd0a8a7e9ac-d-a-h-u-sayy-sinh-t-d-a-h-u-si-u-hot.webp",
        "isAvailable": true,
        "sortOrder": 3,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Dừa Thạch Nổ Đậu Đỏ May Mắn",
        "description": "Món nước dừa thạch nổ đậu đỏ may mắn với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774533585289-c6449d92-f561-4bac-b807-adf984441952-n-c-d-a-th-ch-n-u-may-m-n.webp",
        "isAvailable": true,
        "sortOrder": 4,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Dừa Hạt Chia",
        "description": "Món nước dừa hạt chia với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774534208848-7f603f0a-ceda-4398-b040-b3e1c42fb30f-n-c-d-a-h-t-chia-t-ng-th-ch-d-a-.webp",
        "isAvailable": true,
        "sortOrder": 5,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Dừa Tươi",
        "description": "Món nước dừa tươi với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774534215660-3e95fc4f-ae29-4231-b5dd-fbfbcb7d870e-n-c-d-a-t-i-t-ng-th-ch-d-a-.webp",
        "isAvailable": true,
        "sortOrder": 6,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Dừa Nước Mát Long Vương",
        "description": "Món nước dừa nước mát long vương với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774534222987-40b82d3d-1623-4f92-8d21-9de99ed94ada-n-c-d-a-n-c-m-t-long-v-ng-tr-n-ch-u-olong-.webp",
        "isAvailable": true,
        "sortOrder": 7,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Dừa Hạt Sen Thanh Mát Giải Nhiệt",
        "description": "Món nước dừa hạt sen thanh mát giải nhiệt với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774534230878-e9f59da1-de2e-40ed-ab29-7688e24a2937-n-c-d-a-h-t-sen-thanh-m-t-gi-i-nhi-t.webp",
        "isAvailable": true,
        "sortOrder": 8,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Dừa Kem Matcha Siêu Phê Nhà Phee",
        "description": "Món nước dừa kem matcha siêu phê nhà phee với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774534239739-6b438938-d5f1-430d-a61e-8cb59fd77df2-n-c-d-a-kem-mattcha-si-u-ph-nh-phee.webp",
        "isAvailable": true,
        "sortOrder": 9,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sen Dừa Quế Hoa Thơm Dịu Nhẹ Nhàng",
        "description": "Món sen dừa quế hoa thơm dịu nhẹ nhàng với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774534244401-3a380e8b-bfac-4177-977c-709c503f6434-sen-d-a-qu-hoa-th-m-d-u-nh-nh-ng.webp",
        "isAvailable": true,
        "sortOrder": 10,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Choco Bạc Hà Đá Say Mát Lạnh Sảng Khoái",
        "description": "Món choco bạc hà đá say mát lạnh sảng khoái với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774534250350-f3b490eb-64fc-41d7-b60b-4ccb596706f2-choco-b-c-h-say-m-t-l-nh-s-ng-kho-i.webp",
        "isAvailable": true,
        "sortOrder": 11,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Trà Măng Cầu Tươi",
        "description": "Món trà măng cầu tươi với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774534254691-72261832-00cd-4b22-a563-9b041d6e9b3e-tr-m-ng-c-u-t-i-b-n-ch-y-.webp",
        "isAvailable": true,
        "sortOrder": 12,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      }
    ]
  },
  {
    "name": "Trà sữa - trà trái cây",
    "sortOrder": 2,
    "items": [
      {
        "name": "Matcha Latte Quế Hoa Topping Linh Tinh",
        "description": "Món matcha latte quế hoa topping linh tinh với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774534267550-75cef8cf-5169-4c59-b026-442b437f4c21-matcha-latte-qu-hoa-topping-linh-tinh.webp",
        "isAvailable": true,
        "sortOrder": 1,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Trà Nhài Cam Mây Trắng Bồng Bềnh",
        "description": "Món trà nhài cam mây trắng bồng bềnh với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774534271552-0961a684-e444-4ac1-9a2e-92f279886f9b-tr-nh-i-cam-m-y-tr-ng-b-ng-b-nh.webp",
        "isAvailable": true,
        "sortOrder": 2,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Trà Mãng Cầu Quế Hoa Hot Trend",
        "description": "Món trà mãng cầu quế hoa hot trend với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774534277367-e6616705-8e60-4b22-84c4-d797a12970ba-tr-m-ng-c-u-qu-hoa-h-t-trend.webp",
        "isAvailable": true,
        "sortOrder": 3,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Bạc Xỉu Up Xỉu Down",
        "description": "Món bạc xỉu up xỉu down với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774534280946-7c60cab0-c9f8-46c6-83f4-1ba701102d4c-b-c-x-u-up-x-u-down.webp",
        "isAvailable": true,
        "sortOrder": 4,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "YaKuLựu Đỏ Trân Châu",
        "description": "Món yakulựu đỏ trân châu với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774534286113-c426387e-b5b2-435c-b599-eeb2a49e9e48-yakul-l-u-tr-n-ch-u.webp",
        "isAvailable": true,
        "sortOrder": 5,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sữa Chua Xoài Dẻo Trân Châu",
        "description": "Món sữa chua xoài dẻo trân châu với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774534291582-d75e3c1f-6200-45e2-abf2-c97f9ee3ba64-s-a-chua-xo-i-d-o-tr-n-ch-u.webp",
        "isAvailable": true,
        "sortOrder": 6,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Hoa Quả Dầm Sữa Chua Dẻo",
        "description": "Món hoa quả dầm sữa chua dẻo với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774534296993-724dc1a4-82c8-4b3b-a4fc-679aee453e95-hoa-qu-d-m-s-a-chua-d-o.webp",
        "isAvailable": true,
        "sortOrder": 7,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Dừa Quế Hoa Hot Trend Siêu Cuốn",
        "description": "Món nước dừa quế hoa hot trend siêu cuốn với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774534303993-1af3438c-9d56-4cbb-8cfd-724b21c9d096-n-c-d-a-qu-hoa-h-t-trend-si-u-cu-n.webp",
        "isAvailable": true,
        "sortOrder": 8,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Bơ Già Dừa Nướng Siêu Ngon",
        "description": "Món bơ già dừa nướng siêu ngon với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774534309172-5eb29c69-e8d7-4574-88bc-367d7f88be4c-b-gi-d-a-n-ng-si-u-ngon.webp",
        "isAvailable": true,
        "sortOrder": 9,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Chanh Leo Núi Đá Ahihi",
        "description": "Món chanh leo núi đá ahihi với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774534313116-068f3ce8-440a-4cfd-83ae-c5fdb2a8da92-chanh-leo-n-i-ahihi.webp",
        "isAvailable": true,
        "sortOrder": 10,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Cam",
        "description": "Món nước ép cam với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774534318763-fc7d2621-a124-48f7-b56b-3c3f1a6973cf-n-c-p-cam.webp",
        "isAvailable": true,
        "sortOrder": 11,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Matcha Latte Siêu Cuốnnnn",
        "description": "Món matcha latte siêu cuốnnnn với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774534323387-acfabeb4-cd53-49ee-b9de-8d27b17f8b54-matcha-latte-si-u-cu-nnnn.webp",
        "isAvailable": true,
        "sortOrder": 12,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Trà Sữa Cốm Non",
        "description": "Món trà sữa cốm non với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "/uploads/menu-items/1774534328263-457c811a-2cd0-4dee-9606-0eb444179f80-tr-s-a-c-m-non-t-ng-topping-tr-n-ch-u-.webp",
        "isAvailable": true,
        "sortOrder": 13,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      }
    ]
  },
  {
    "name": "Kem - sữa chua dẻo mlem mlem",
    "sortOrder": 3,
    "items": [
      {
        "name": "Kem Dừa Cốm Non Siêu Ngon",
        "description": "Món kem dừa cốm non siêu ngon với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Kem%20D%E1%BB%ABa%20C%E1%BB%91m%20Non%20Si%C3%AAu%20Ngon",
        "isAvailable": true,
        "sortOrder": 1,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sữa Chua Xoài Dẻo Trân Châu",
        "description": "Món sữa chua xoài dẻo trân châu với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=S%E1%BB%AFa%20Chua%20Xo%C3%A0i%20D%E1%BA%BBo%20Tr%C3%A2n%20Ch%C3%A2u",
        "isAvailable": true,
        "sortOrder": 2,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Hoa Quả Dầm Kem Dừa Trân Châu",
        "description": "Món hoa quả dầm kem dừa trân châu với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Hoa%20Qu%E1%BA%A3%20D%E1%BA%A7m%20Kem%20D%E1%BB%ABa%20Tr%C3%A2n%20Ch%C3%A2u",
        "isAvailable": true,
        "sortOrder": 3,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Kem Bơ Dừa Đà Lạt",
        "description": "Món kem bơ dừa đà lạt với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Kem%20B%C6%A1%20D%E1%BB%ABa%20%C4%90%C3%A0%20L%E1%BA%A1t",
        "isAvailable": true,
        "sortOrder": 4,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Kem Bơ Sầu Riêng",
        "description": "Món kem bơ sầu riêng với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Kem%20B%C6%A1%20S%E1%BA%A7u%20Ri%C3%AAng",
        "isAvailable": true,
        "sortOrder": 5,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sữa Chua Dẻo Cốm Non Trân Châu 3Q",
        "description": "Món sữa chua dẻo cốm non trân châu 3q với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=S%E1%BB%AFa%20Chua%20D%E1%BA%BBo%20C%E1%BB%91m%20Non%20Tr%C3%A2n%20Ch%C3%A2u%203Q",
        "isAvailable": true,
        "sortOrder": 6,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Milo Sữa Chua Dẻo Sốt Kiwi",
        "description": "Món milo sữa chua dẻo sốt kiwi với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Milo%20S%E1%BB%AFa%20Chua%20D%E1%BA%BBo%20S%E1%BB%91t%20Kiwi",
        "isAvailable": true,
        "sortOrder": 7,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Milo Sữa Chua Dẻo Sốt Dâu Tây",
        "description": "Món milo sữa chua dẻo sốt dâu tây với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Milo%20S%E1%BB%AFa%20Chua%20D%E1%BA%BBo%20S%E1%BB%91t%20D%C3%A2u%20T%C3%A2y",
        "isAvailable": true,
        "sortOrder": 8,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Milo Sữa Chua Dẻo Sốt Đào",
        "description": "Món milo sữa chua dẻo sốt đào với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Milo%20S%E1%BB%AFa%20Chua%20D%E1%BA%BBo%20S%E1%BB%91t%20%C4%90%C3%A0o",
        "isAvailable": true,
        "sortOrder": 9,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Milo Sữa Chua Dẻo Sốt Việt Quất",
        "description": "Món milo sữa chua dẻo sốt việt quất với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Milo%20S%E1%BB%AFa%20Chua%20D%E1%BA%BBo%20S%E1%BB%91t%20Vi%E1%BB%87t%20Qu%E1%BA%A5t",
        "isAvailable": true,
        "sortOrder": 10,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Milo Sữa Chua Dẻo Sốt Caramel",
        "description": "Món milo sữa chua dẻo sốt caramel với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Milo%20S%E1%BB%AFa%20Chua%20D%E1%BA%BBo%20S%E1%BB%91t%20Caramel",
        "isAvailable": true,
        "sortOrder": 11,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Milo Sữa Chua Dẻo Sốt Chocolate",
        "description": "Món milo sữa chua dẻo sốt chocolate với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Milo%20S%E1%BB%AFa%20Chua%20D%E1%BA%BBo%20S%E1%BB%91t%20Chocolate",
        "isAvailable": true,
        "sortOrder": 12,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      }
    ]
  },
  {
    "name": "Nước ép detox healthy",
    "sortOrder": 4,
    "items": [
      {
        "name": "Nước Dừa Quế Hoa Hot Trend Siêu Cuốn",
        "description": "Món nước dừa quế hoa hot trend siêu cuốn với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20D%E1%BB%ABa%20Qu%E1%BA%BF%20Hoa%20Hot%20Trend%20Si%C3%AAu%20Cu%E1%BB%91n",
        "isAvailable": true,
        "sortOrder": 1,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Cóc - Táo Siêu Hot",
        "description": "Món nước ép cóc - táo siêu hot với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20C%C3%B3c%20-%20T%C3%A1o%20Si%C3%AAu%20Hot",
        "isAvailable": true,
        "sortOrder": 2,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Dưa Hấu",
        "description": "Món nước ép dưa hấu với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20D%C6%B0a%20H%E1%BA%A5u",
        "isAvailable": true,
        "sortOrder": 3,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Cóc Mix Ổi",
        "description": "Món nước ép cóc mix ổi với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20C%C3%B3c%20Mix%20%E1%BB%94i",
        "isAvailable": true,
        "sortOrder": 4,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Ổi - Chanh Leo",
        "description": "Món nước ép ổi - chanh leo với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20%E1%BB%94i%20-%20Chanh%20Leo",
        "isAvailable": true,
        "sortOrder": 5,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Cóc - Dứa",
        "description": "Món nước ép cóc - dứa với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20C%C3%B3c%20-%20D%E1%BB%A9a",
        "isAvailable": true,
        "sortOrder": 6,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Cần Tây - Táo",
        "description": "Món nước ép cần tây - táo với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20C%E1%BA%A7n%20T%C3%A2y%20-%20T%C3%A1o",
        "isAvailable": true,
        "sortOrder": 7,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Cần Tây - Dứa - Ổi",
        "description": "Món nước ép cần tây - dứa - ổi với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20C%E1%BA%A7n%20T%C3%A2y%20-%20D%E1%BB%A9a%20-%20%E1%BB%94i",
        "isAvailable": true,
        "sortOrder": 8,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Cần Tây - Táo - Cà Rốt",
        "description": "Món nước ép cần tây - táo - cà rốt với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20C%E1%BA%A7n%20T%C3%A2y%20-%20T%C3%A1o%20-%20C%C3%A0%20R%E1%BB%91t",
        "isAvailable": true,
        "sortOrder": 9,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Cần Tây - Cam - Dứa",
        "description": "Món nước ép cần tây - cam - dứa với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20C%E1%BA%A7n%20T%C3%A2y%20-%20Cam%20-%20D%E1%BB%A9a",
        "isAvailable": true,
        "sortOrder": 10,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Cóc - Ổi",
        "description": "Món nước ép cóc - ổi với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20C%C3%B3c%20-%20%E1%BB%94i",
        "isAvailable": true,
        "sortOrder": 11,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Cam Mix Cà Rốt",
        "description": "Món nước ép cam mix cà rốt với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20Cam%20Mix%20C%C3%A0%20R%E1%BB%91t",
        "isAvailable": true,
        "sortOrder": 12,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Cam Mix Táo",
        "description": "Món nước ép cam mix táo với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20Cam%20Mix%20T%C3%A1o",
        "isAvailable": true,
        "sortOrder": 13,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Dứa Mix Táo",
        "description": "Món nước ép dứa mix táo với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20D%E1%BB%A9a%20Mix%20T%C3%A1o",
        "isAvailable": true,
        "sortOrder": 14,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Dứa Mix Cà Rốt",
        "description": "Món nước ép dứa mix cà rốt với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20D%E1%BB%A9a%20Mix%20C%C3%A0%20R%E1%BB%91t",
        "isAvailable": true,
        "sortOrder": 15,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Dứa Mix Ổi",
        "description": "Món nước ép dứa mix ổi với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20D%E1%BB%A9a%20Mix%20%E1%BB%94i",
        "isAvailable": true,
        "sortOrder": 16,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Chanh Leo",
        "description": "Món nước ép chanh leo với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20Chanh%20Leo",
        "isAvailable": true,
        "sortOrder": 17,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Táo Mix Ổi",
        "description": "Món nước ép táo mix ổi với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20T%C3%A1o%20Mix%20%E1%BB%94i",
        "isAvailable": true,
        "sortOrder": 18,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Cóc Bao Tử",
        "description": "Món nước ép cóc bao tử với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20C%C3%B3c%20Bao%20T%E1%BB%AD",
        "isAvailable": true,
        "sortOrder": 19,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Cà Rốt",
        "description": "Món nước ép cà rốt với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20C%C3%A0%20R%E1%BB%91t",
        "isAvailable": true,
        "sortOrder": 20,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Táo",
        "description": "Món nước ép táo với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20T%C3%A1o",
        "isAvailable": true,
        "sortOrder": 21,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Ổi",
        "description": "Món nước ép ổi với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20%E1%BB%94i",
        "isAvailable": true,
        "sortOrder": 22,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Dứa",
        "description": "Món nước ép dứa với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20D%E1%BB%A9a",
        "isAvailable": true,
        "sortOrder": 23,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Cam - Dứa",
        "description": "Món nước ép cam - dứa với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20Cam%20-%20D%E1%BB%A9a",
        "isAvailable": true,
        "sortOrder": 24,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Cam",
        "description": "Món nước ép cam với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20Cam",
        "isAvailable": true,
        "sortOrder": 25,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Cần Tây - Dứa",
        "description": "Món nước ép cần tây - dứa với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20C%E1%BA%A7n%20T%C3%A2y%20-%20D%E1%BB%A9a",
        "isAvailable": true,
        "sortOrder": 26,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Lựu",
        "description": "Món nước ép lựu với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20L%E1%BB%B1u",
        "isAvailable": true,
        "sortOrder": 27,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Nước Ép Roi Đỏ",
        "description": "Món nước ép roi đỏ với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20Roi%20%C4%90%E1%BB%8F",
        "isAvailable": true,
        "sortOrder": 28,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      }
    ]
  },
  {
    "name": "Sinh tố trái cây",
    "sortOrder": 5,
    "items": [
      {
        "name": "Sinh Tố Bơ Kem Chesse Món Mới Siêu Ngon",
        "description": "Món sinh tố bơ kem chesse món mới siêu ngon với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Sinh%20T%E1%BB%91%20B%C6%A1%20Kem%20Chesse%20M%C3%B3n%20M%E1%BB%9Bi%20Si%C3%AAu%20Ngon",
        "isAvailable": true,
        "sortOrder": 1,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Bơ Già Dừa Nướng Siêu Ngon",
        "description": "Món bơ già dừa nướng siêu ngon với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=B%C6%A1%20Gi%C3%A0%20D%E1%BB%ABa%20N%C6%B0%E1%BB%9Bng%20Si%C3%AAu%20Ngon",
        "isAvailable": true,
        "sortOrder": 2,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Chanh Leo Núi Đá Ahihi",
        "description": "Món chanh leo núi đá ahihi với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Chanh%20Leo%20N%C3%BAi%20%C4%90%C3%A1%20Ahihi",
        "isAvailable": true,
        "sortOrder": 3,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Kem Bơ Dừa Đà Lạt",
        "description": "Món kem bơ dừa đà lạt với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Kem%20B%C6%A1%20D%E1%BB%ABa%20%C4%90%C3%A0%20L%E1%BA%A1t",
        "isAvailable": true,
        "sortOrder": 4,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Kem Bơ Sầu Riêng",
        "description": "Món kem bơ sầu riêng với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Kem%20B%C6%A1%20S%E1%BA%A7u%20Ri%C3%AAng",
        "isAvailable": true,
        "sortOrder": 5,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sinh Tố Bơ",
        "description": "Món sinh tố bơ với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Sinh%20T%E1%BB%91%20B%C6%A1",
        "isAvailable": true,
        "sortOrder": 6,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sinh Tố Xoài - Chanh Leo",
        "description": "Món sinh tố xoài - chanh leo với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Sinh%20T%E1%BB%91%20Xo%C3%A0i%20-%20Chanh%20Leo",
        "isAvailable": true,
        "sortOrder": 7,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sinh Tố Bơ Dừa",
        "description": "Món sinh tố bơ dừa với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Sinh%20T%E1%BB%91%20B%C6%A1%20D%E1%BB%ABa",
        "isAvailable": true,
        "sortOrder": 8,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sinh Tố Bơ Xoài",
        "description": "Món sinh tố bơ xoài với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Sinh%20T%E1%BB%91%20B%C6%A1%20Xo%C3%A0i",
        "isAvailable": true,
        "sortOrder": 9,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sinh Tố Mãng Cầu",
        "description": "Món sinh tố mãng cầu với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Sinh%20T%E1%BB%91%20M%C3%A3ng%20C%E1%BA%A7u",
        "isAvailable": true,
        "sortOrder": 10,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sữa Chua Dẻo Cốm Non",
        "description": "Món sữa chua dẻo cốm non với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=S%E1%BB%AFa%20Chua%20D%E1%BA%BBo%20C%E1%BB%91m%20Non",
        "isAvailable": true,
        "sortOrder": 11,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sinh Tố Xoài Dừa",
        "description": "Món sinh tố xoài dừa với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Sinh%20T%E1%BB%91%20Xo%C3%A0i%20D%E1%BB%ABa",
        "isAvailable": true,
        "sortOrder": 12,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sinh Tố Xoài Mãng Cầu",
        "description": "Món sinh tố xoài mãng cầu với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Sinh%20T%E1%BB%91%20Xo%C3%A0i%20M%C3%A3ng%20C%E1%BA%A7u",
        "isAvailable": true,
        "sortOrder": 13,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sinh Tố Xoài",
        "description": "Món sinh tố xoài với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Sinh%20T%E1%BB%91%20Xo%C3%A0i",
        "isAvailable": true,
        "sortOrder": 14,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Chanh Tuyết AvoMoRi - Sinh Tố Chanh Tuyết",
        "description": "Món chanh tuyết avomori - sinh tố chanh tuyết với 2 lựa chọn dung tích 500ml và 700ml, có thể thêm topping theo sở thích.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Chanh%20Tuy%E1%BA%BFt%20AvoMoRi%20-%20Sinh%20T%E1%BB%91%20Chanh%20Tuy%E1%BA%BFt",
        "isAvailable": true,
        "sortOrder": 15,
        "variants": [
          {
            "name": "Cốc 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "Cốc 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      }
    ]
  }
] as const;

export const STARTER_MENU_TOTAL_ITEMS = 80;

export function buildStarterImageUrl(name: string) {
  return `https://placehold.co/800x600/f5f5f4/1c1917?text=${encodeURIComponent(name)}`;
}
