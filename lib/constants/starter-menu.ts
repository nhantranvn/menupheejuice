export const STARTER_TOPPINGS = [
  {
    "name": "H\u1ea1t sen",
    "price": 10000,
    "sortOrder": 1,
    "isActive": true
  },
  {
    "name": "Tr\u00e2n ch\u00e2u tr\u1eafng",
    "price": 5000,
    "sortOrder": 2,
    "isActive": true
  },
  {
    "name": "Tr\u00e2n ch\u00e2u \u0111en",
    "price": 5000,
    "sortOrder": 3,
    "isActive": true
  },
  {
    "name": "Th\u1ea1ch n\u1ed5 c\u1ee7 n\u0103ng",
    "price": 10000,
    "sortOrder": 4,
    "isActive": true
  },
  {
    "name": "Th\u1ea1ch nha \u0111am",
    "price": 5000,
    "sortOrder": 5,
    "isActive": true
  },
  {
    "name": "Th\u1ea1ch d\u1eeba",
    "price": 5000,
    "sortOrder": 6,
    "isActive": true
  },
  {
    "name": "Th\u1ea1ch n\u1ed5 \u0111\u1eadu \u0111\u1ecf",
    "price": 5000,
    "sortOrder": 7,
    "isActive": true
  },
  {
    "name": "Tr\u00e2n ch\u00e2u \u00f4 long",
    "price": 5000,
    "sortOrder": 8,
    "isActive": true
  }
] as const;

export const STARTER_MENU = [
  {
    "name": "M\u00f3n m\u1edbi si\u00eau \u0111\u1ec9nh",
    "sortOrder": 1,
    "items": [
      {
        "name": "S\u1eefa D\u00e2u S\u1ea5y Tr\u0103ng Hoa",
        "description": "M\u00f3n s\u1eefa d\u00e2u s\u1ea5y tr\u0103ng hoa v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774532850278-2340386c-68ff-48c4-8862-c6ef3355ca1e-s-a-d-u-s-y-th-ng-hoa.webp",
        "isAvailable": true,
        "sortOrder": 1,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "S\u1eefa Chua D\u1ebbo C\u1ed1m Xo\u00e0i Tr\u00e2n Ch\u00e2u",
        "description": "M\u00f3n s\u1eefa chua d\u1ebbo c\u1ed1m xo\u00e0i tr\u00e2n ch\u00e2u v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774533573995-6221874f-dbc8-457c-8fe1-f10ef5de6636-s-a-chua-d-o-c-m-xo-i-tr-n-ch-u.webp",
        "isAvailable": true,
        "sortOrder": 2,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "D\u01b0a H\u1ea5u \u0110\u00e1 Sayy - Sinh T\u1ed1 D\u01b0a H\u1ea5u Si\u00eau Hot",
        "description": "M\u00f3n d\u01b0a h\u1ea5u \u0111\u00e1 sayy - sinh t\u1ed1 d\u01b0a h\u1ea5u si\u00eau hot v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774533581206-e4295c54-3bc8-4c4c-9c13-edd0a8a7e9ac-d-a-h-u-sayy-sinh-t-d-a-h-u-si-u-hot.webp",
        "isAvailable": true,
        "sortOrder": 3,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc D\u1eeba Th\u1ea1ch N\u1ed5 \u0110\u1eadu \u0110\u1ecf May M\u1eafn",
        "description": "M\u00f3n n\u01b0\u1edbc d\u1eeba th\u1ea1ch n\u1ed5 \u0111\u1eadu \u0111\u1ecf may m\u1eafn v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774533585289-c6449d92-f561-4bac-b807-adf984441952-n-c-d-a-th-ch-n-u-may-m-n.webp",
        "isAvailable": true,
        "sortOrder": 4,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc D\u1eeba H\u1ea1t Chia",
        "description": "M\u00f3n n\u01b0\u1edbc d\u1eeba h\u1ea1t chia v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774534208848-7f603f0a-ceda-4398-b040-b3e1c42fb30f-n-c-d-a-h-t-chia-t-ng-th-ch-d-a-.webp",
        "isAvailable": true,
        "sortOrder": 5,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc D\u1eeba T\u01b0\u01a1i",
        "description": "M\u00f3n n\u01b0\u1edbc d\u1eeba t\u01b0\u01a1i v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774534215660-3e95fc4f-ae29-4231-b5dd-fbfbcb7d870e-n-c-d-a-t-i-t-ng-th-ch-d-a-.webp",
        "isAvailable": true,
        "sortOrder": 6,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc D\u1eeba N\u01b0\u1edbc M\u00e1t Long V\u01b0\u01a1ng",
        "description": "M\u00f3n n\u01b0\u1edbc d\u1eeba n\u01b0\u1edbc m\u00e1t long v\u01b0\u01a1ng v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774534222987-40b82d3d-1623-4f92-8d21-9de99ed94ada-n-c-d-a-n-c-m-t-long-v-ng-tr-n-ch-u-olong-.webp",
        "isAvailable": true,
        "sortOrder": 7,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc D\u1eeba H\u1ea1t Sen Thanh M\u00e1t Gi\u1ea3i Nhi\u1ec7t",
        "description": "M\u00f3n n\u01b0\u1edbc d\u1eeba h\u1ea1t sen thanh m\u00e1t gi\u1ea3i nhi\u1ec7t v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774534230878-e9f59da1-de2e-40ed-ab29-7688e24a2937-n-c-d-a-h-t-sen-thanh-m-t-gi-i-nhi-t.webp",
        "isAvailable": true,
        "sortOrder": 8,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc D\u1eeba Kem Matcha Si\u00eau Ph\u00ea Nh\u00e0 Phee",
        "description": "M\u00f3n n\u01b0\u1edbc d\u1eeba kem matcha si\u00eau ph\u00ea nh\u00e0 phee v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774534239739-6b438938-d5f1-430d-a61e-8cb59fd77df2-n-c-d-a-kem-mattcha-si-u-ph-nh-phee.webp",
        "isAvailable": true,
        "sortOrder": 9,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sen D\u1eeba Qu\u1ebf Hoa Th\u01a1m D\u1ecbu Nh\u1eb9 Nh\u00e0ng",
        "description": "M\u00f3n sen d\u1eeba qu\u1ebf hoa th\u01a1m d\u1ecbu nh\u1eb9 nh\u00e0ng v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774534244401-3a380e8b-bfac-4177-977c-709c503f6434-sen-d-a-qu-hoa-th-m-d-u-nh-nh-ng.webp",
        "isAvailable": true,
        "sortOrder": 10,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Choco B\u1ea1c H\u00e0 \u0110\u00e1 Say M\u00e1t L\u1ea1nh S\u1ea3ng Kho\u00e1i",
        "description": "M\u00f3n choco b\u1ea1c h\u00e0 \u0111\u00e1 say m\u00e1t l\u1ea1nh s\u1ea3ng kho\u00e1i v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774534250350-f3b490eb-64fc-41d7-b60b-4ccb596706f2-choco-b-c-h-say-m-t-l-nh-s-ng-kho-i.webp",
        "isAvailable": true,
        "sortOrder": 11,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Tr\u00e0 M\u0103ng C\u1ea7u T\u01b0\u01a1i",
        "description": "M\u00f3n tr\u00e0 m\u0103ng c\u1ea7u t\u01b0\u01a1i v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774534254691-72261832-00cd-4b22-a563-9b041d6e9b3e-tr-m-ng-c-u-t-i-b-n-ch-y-.webp",
        "isAvailable": true,
        "sortOrder": 12,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      }
    ]
  },
  {
    "name": "Tr\u00e0 s\u1eefa - tr\u00e0 tr\u00e1i c\u00e2y",
    "sortOrder": 2,
    "items": [
      {
        "name": "Matcha Latte Qu\u1ebf Hoa Topping Linh Tinh",
        "description": "M\u00f3n matcha latte qu\u1ebf hoa topping linh tinh v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774534267550-75cef8cf-5169-4c59-b026-442b437f4c21-matcha-latte-qu-hoa-topping-linh-tinh.webp",
        "isAvailable": true,
        "sortOrder": 1,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Tr\u00e0 Nh\u00e0i Cam M\u00e2y Tr\u1eafng B\u1ed3ng B\u1ec1nh",
        "description": "M\u00f3n tr\u00e0 nh\u00e0i cam m\u00e2y tr\u1eafng b\u1ed3ng b\u1ec1nh v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774534271552-0961a684-e444-4ac1-9a2e-92f279886f9b-tr-nh-i-cam-m-y-tr-ng-b-ng-b-nh.webp",
        "isAvailable": true,
        "sortOrder": 2,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Tr\u00e0 M\u00e3ng C\u1ea7u Qu\u1ebf Hoa Hot Trend",
        "description": "M\u00f3n tr\u00e0 m\u00e3ng c\u1ea7u qu\u1ebf hoa hot trend v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774534277367-e6616705-8e60-4b22-84c4-d797a12970ba-tr-m-ng-c-u-qu-hoa-h-t-trend.webp",
        "isAvailable": true,
        "sortOrder": 3,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "B\u1ea1c X\u1ec9u Up X\u1ec9u Down",
        "description": "M\u00f3n b\u1ea1c x\u1ec9u up x\u1ec9u down v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774534280946-7c60cab0-c9f8-46c6-83f4-1ba701102d4c-b-c-x-u-up-x-u-down.webp",
        "isAvailable": true,
        "sortOrder": 4,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "YaKuL\u1ef1u \u0110\u1ecf Tr\u00e2n Ch\u00e2u",
        "description": "M\u00f3n yakul\u1ef1u \u0111\u1ecf tr\u00e2n ch\u00e2u v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774534286113-c426387e-b5b2-435c-b599-eeb2a49e9e48-yakul-l-u-tr-n-ch-u.webp",
        "isAvailable": true,
        "sortOrder": 5,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "S\u1eefa Chua Xo\u00e0i D\u1ebbo Tr\u00e2n Ch\u00e2u",
        "description": "M\u00f3n s\u1eefa chua xo\u00e0i d\u1ebbo tr\u00e2n ch\u00e2u v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774534291582-d75e3c1f-6200-45e2-abf2-c97f9ee3ba64-s-a-chua-xo-i-d-o-tr-n-ch-u.webp",
        "isAvailable": true,
        "sortOrder": 6,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Hoa Qu\u1ea3 D\u1ea7m S\u1eefa Chua D\u1ebbo",
        "description": "M\u00f3n hoa qu\u1ea3 d\u1ea7m s\u1eefa chua d\u1ebbo v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774534296993-724dc1a4-82c8-4b3b-a4fc-679aee453e95-hoa-qu-d-m-s-a-chua-d-o.webp",
        "isAvailable": true,
        "sortOrder": 7,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc D\u1eeba Qu\u1ebf Hoa Hot Trend Si\u00eau Cu\u1ed1n",
        "description": "M\u00f3n n\u01b0\u1edbc d\u1eeba qu\u1ebf hoa hot trend si\u00eau cu\u1ed1n v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774534303993-1af3438c-9d56-4cbb-8cfd-724b21c9d096-n-c-d-a-qu-hoa-h-t-trend-si-u-cu-n.webp",
        "isAvailable": true,
        "sortOrder": 8,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "B\u01a1 Gi\u00e0 D\u1eeba N\u01b0\u1edbng Si\u00eau Ngon",
        "description": "M\u00f3n b\u01a1 gi\u00e0 d\u1eeba n\u01b0\u1edbng si\u00eau ngon v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774534309172-5eb29c69-e8d7-4574-88bc-367d7f88be4c-b-gi-d-a-n-ng-si-u-ngon.webp",
        "isAvailable": true,
        "sortOrder": 9,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Chanh Leo N\u00fai \u0110\u00e1 Ahihi",
        "description": "M\u00f3n chanh leo n\u00fai \u0111\u00e1 ahihi v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774534313116-068f3ce8-440a-4cfd-83ae-c5fdb2a8da92-chanh-leo-n-i-ahihi.webp",
        "isAvailable": true,
        "sortOrder": 10,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p Cam",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p cam v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774534318763-fc7d2621-a124-48f7-b56b-3c3f1a6973cf-n-c-p-cam.webp",
        "isAvailable": true,
        "sortOrder": 11,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Matcha Latte Si\u00eau Cu\u1ed1nnnn",
        "description": "M\u00f3n matcha latte si\u00eau cu\u1ed1nnnn v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774534323387-acfabeb4-cd53-49ee-b9de-8d27b17f8b54-matcha-latte-si-u-cu-nnnn.webp",
        "isAvailable": true,
        "sortOrder": 12,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Tr\u00e0 S\u1eefa C\u1ed1m Non",
        "description": "M\u00f3n tr\u00e0 s\u1eefa c\u1ed1m non v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774534328263-457c811a-2cd0-4dee-9606-0eb444179f80-tr-s-a-c-m-non-t-ng-topping-tr-n-ch-u-.webp",
        "isAvailable": true,
        "sortOrder": 13,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      }
    ]
  },
  {
    "name": "Kem - s\u1eefa chua d\u1ebbo mlem mlem",
    "sortOrder": 3,
    "items": [
      {
        "name": "Kem D\u1eeba C\u1ed1m Non Si\u00eau Ngon",
        "description": "M\u00f3n kem d\u1eeba c\u1ed1m non si\u00eau ngon v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774696194524-01e44759-c247-4fdd-9e10-2261c4935964-kem-d-a-c-m-non-si-u-ngon.webp",
        "isAvailable": true,
        "sortOrder": 1,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "S\u1eefa Chua Xo\u00e0i D\u1ebbo Tr\u00e2n Ch\u00e2u",
        "description": "M\u00f3n s\u1eefa chua xo\u00e0i d\u1ebbo tr\u00e2n ch\u00e2u v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774696211856-638ab585-d021-4337-b736-41b541c2fb37-s-a-chua-xo-i-d-o-tr-n-ch-u.webp",
        "isAvailable": true,
        "sortOrder": 2,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Hoa Qu\u1ea3 D\u1ea7m Kem D\u1eeba Tr\u00e2n Ch\u00e2u",
        "description": "M\u00f3n hoa qu\u1ea3 d\u1ea7m kem d\u1eeba tr\u00e2n ch\u00e2u v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774696235235-9e66eafa-5c06-4a32-877b-011a3a25390f-hoa-qu-d-m-s-a-chua-d-o.webp",
        "isAvailable": true,
        "sortOrder": 3,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Kem B\u01a1 D\u1eeba \u0110\u00e0 L\u1ea1t",
        "description": "M\u00f3n kem b\u01a1 d\u1eeba \u0111\u00e0 l\u1ea1t v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774696241733-7f7d06d2-8d07-45cd-b834-c5e6acc99457-kem-b-d-a-l-t.webp",
        "isAvailable": true,
        "sortOrder": 4,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Kem B\u01a1 S\u1ea7u Ri\u00eang",
        "description": "M\u00f3n kem b\u01a1 s\u1ea7u ri\u00eang v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774696246644-52727d6d-9d3f-4da6-97da-22d3d4e5997a-kem-b-s-u-ri-ng.webp",
        "isAvailable": true,
        "sortOrder": 5,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "S\u1eefa Chua D\u1ebbo C\u1ed1m Non Tr\u00e2n Ch\u00e2u 3Q",
        "description": "M\u00f3n s\u1eefa chua d\u1ebbo c\u1ed1m non tr\u00e2n ch\u00e2u 3q v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774696252669-42ddd776-a993-4815-84f1-1d25be169a52-s-a-chua-d-o-c-m-non-tr-n-ch-u-3q.webp",
        "isAvailable": true,
        "sortOrder": 6,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Milo S\u1eefa Chua D\u1ebbo S\u1ed1t Kiwi",
        "description": "M\u00f3n milo s\u1eefa chua d\u1ebbo s\u1ed1t kiwi v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774696259660-ac27f479-c0f3-4d98-a592-bdf5eeaaf8ca-milo-s-a-chua-d-o-s-t-kiwi.webp",
        "isAvailable": true,
        "sortOrder": 7,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Milo S\u1eefa Chua D\u1ebbo S\u1ed1t D\u00e2u T\u00e2y",
        "description": "M\u00f3n milo s\u1eefa chua d\u1ebbo s\u1ed1t d\u00e2u t\u00e2y v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774696265177-8c1c94e5-65da-4baa-92b5-738260c73182-milo-s-a-chua-d-o-s-t-d-u-t-y.webp",
        "isAvailable": true,
        "sortOrder": 8,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Milo S\u1eefa Chua D\u1ebbo S\u1ed1t \u0110\u00e0o",
        "description": "M\u00f3n milo s\u1eefa chua d\u1ebbo s\u1ed1t \u0111\u00e0o v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774696270264-c7af969a-da0f-48d0-87a2-f2f9aa05dc8e-milo-s-a-chua-d-o-s-t-o.webp",
        "isAvailable": true,
        "sortOrder": 9,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Milo S\u1eefa Chua D\u1ebbo S\u1ed1t Vi\u1ec7t Qu\u1ea5t",
        "description": "M\u00f3n milo s\u1eefa chua d\u1ebbo s\u1ed1t vi\u1ec7t qu\u1ea5t v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774696276400-bda7de68-0983-44de-8e45-0dceb2d71cdc-milo-s-a-chua-d-o-s-t-vi-t-qu-t.webp",
        "isAvailable": true,
        "sortOrder": 10,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Milo S\u1eefa Chua D\u1ebbo S\u1ed1t Caramel",
        "description": "M\u00f3n milo s\u1eefa chua d\u1ebbo s\u1ed1t caramel v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774696282993-2d77b234-8bbe-4054-8e3a-a3436a4e18a7-milo-s-a-chua-d-o-s-t-caramel.webp",
        "isAvailable": true,
        "sortOrder": 11,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Milo S\u1eefa Chua D\u1ebbo S\u1ed1t Chocolate",
        "description": "M\u00f3n milo s\u1eefa chua d\u1ebbo s\u1ed1t chocolate v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774696288282-19243e48-3b39-4c7d-92ac-bbf9fafc991f-milo-s-a-chua-d-o-s-t-chocolate.webp",
        "isAvailable": true,
        "sortOrder": 12,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      }
    ]
  },
  {
    "name": "N\u01b0\u1edbc \u00e9p detox healthy",
    "sortOrder": 4,
    "items": [
      {
        "name": "N\u01b0\u1edbc D\u1eeba Qu\u1ebf Hoa Hot Trend Si\u00eau Cu\u1ed1n",
        "description": "M\u00f3n n\u01b0\u1edbc d\u1eeba qu\u1ebf hoa hot trend si\u00eau cu\u1ed1n v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "/uploads/menu-items/1774696310694-c8c8eb0f-5c64-484e-935b-c15d1fef4326-n-c-d-a-qu-hoa-h-t-trend-si-u-cu-n.webp",
        "isAvailable": true,
        "sortOrder": 1,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p C\u00f3c - T\u00e1o Si\u00eau Hot",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p c\u00f3c - t\u00e1o si\u00eau hot v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20C%C3%B3c%20-%20T%C3%A1o%20Si%C3%AAu%20Hot",
        "isAvailable": true,
        "sortOrder": 2,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p D\u01b0a H\u1ea5u",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p d\u01b0a h\u1ea5u v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20D%C6%B0a%20H%E1%BA%A5u",
        "isAvailable": true,
        "sortOrder": 3,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p C\u00f3c Mix \u1ed4i",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p c\u00f3c mix \u1ed5i v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20C%C3%B3c%20Mix%20%E1%BB%94i",
        "isAvailable": true,
        "sortOrder": 4,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p \u1ed4i - Chanh Leo",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p \u1ed5i - chanh leo v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20%E1%BB%94i%20-%20Chanh%20Leo",
        "isAvailable": true,
        "sortOrder": 5,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p C\u00f3c - D\u1ee9a",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p c\u00f3c - d\u1ee9a v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20C%C3%B3c%20-%20D%E1%BB%A9a",
        "isAvailable": true,
        "sortOrder": 6,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p C\u1ea7n T\u00e2y - T\u00e1o",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p c\u1ea7n t\u00e2y - t\u00e1o v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20C%E1%BA%A7n%20T%C3%A2y%20-%20T%C3%A1o",
        "isAvailable": true,
        "sortOrder": 7,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p C\u1ea7n T\u00e2y - D\u1ee9a - \u1ed4i",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p c\u1ea7n t\u00e2y - d\u1ee9a - \u1ed5i v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20C%E1%BA%A7n%20T%C3%A2y%20-%20D%E1%BB%A9a%20-%20%E1%BB%94i",
        "isAvailable": true,
        "sortOrder": 8,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p C\u1ea7n T\u00e2y - T\u00e1o - C\u00e0 R\u1ed1t",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p c\u1ea7n t\u00e2y - t\u00e1o - c\u00e0 r\u1ed1t v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20C%E1%BA%A7n%20T%C3%A2y%20-%20T%C3%A1o%20-%20C%C3%A0%20R%E1%BB%91t",
        "isAvailable": true,
        "sortOrder": 9,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p C\u1ea7n T\u00e2y - Cam - D\u1ee9a",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p c\u1ea7n t\u00e2y - cam - d\u1ee9a v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20C%E1%BA%A7n%20T%C3%A2y%20-%20Cam%20-%20D%E1%BB%A9a",
        "isAvailable": true,
        "sortOrder": 10,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p C\u00f3c - \u1ed4i",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p c\u00f3c - \u1ed5i v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20C%C3%B3c%20-%20%E1%BB%94i",
        "isAvailable": true,
        "sortOrder": 11,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p Cam Mix C\u00e0 R\u1ed1t",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p cam mix c\u00e0 r\u1ed1t v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20Cam%20Mix%20C%C3%A0%20R%E1%BB%91t",
        "isAvailable": true,
        "sortOrder": 12,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p Cam Mix T\u00e1o",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p cam mix t\u00e1o v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20Cam%20Mix%20T%C3%A1o",
        "isAvailable": true,
        "sortOrder": 13,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p D\u1ee9a Mix T\u00e1o",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p d\u1ee9a mix t\u00e1o v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20D%E1%BB%A9a%20Mix%20T%C3%A1o",
        "isAvailable": true,
        "sortOrder": 14,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p D\u1ee9a Mix C\u00e0 R\u1ed1t",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p d\u1ee9a mix c\u00e0 r\u1ed1t v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20D%E1%BB%A9a%20Mix%20C%C3%A0%20R%E1%BB%91t",
        "isAvailable": true,
        "sortOrder": 15,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p D\u1ee9a Mix \u1ed4i",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p d\u1ee9a mix \u1ed5i v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20D%E1%BB%A9a%20Mix%20%E1%BB%94i",
        "isAvailable": true,
        "sortOrder": 16,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p Chanh Leo",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p chanh leo v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20Chanh%20Leo",
        "isAvailable": true,
        "sortOrder": 17,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p T\u00e1o Mix \u1ed4i",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p t\u00e1o mix \u1ed5i v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20T%C3%A1o%20Mix%20%E1%BB%94i",
        "isAvailable": true,
        "sortOrder": 18,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p C\u00f3c Bao T\u1eed",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p c\u00f3c bao t\u1eed v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20C%C3%B3c%20Bao%20T%E1%BB%AD",
        "isAvailable": true,
        "sortOrder": 19,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p C\u00e0 R\u1ed1t",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p c\u00e0 r\u1ed1t v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20C%C3%A0%20R%E1%BB%91t",
        "isAvailable": true,
        "sortOrder": 20,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p T\u00e1o",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p t\u00e1o v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20T%C3%A1o",
        "isAvailable": true,
        "sortOrder": 21,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p \u1ed4i",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p \u1ed5i v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20%E1%BB%94i",
        "isAvailable": true,
        "sortOrder": 22,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p D\u1ee9a",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p d\u1ee9a v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20D%E1%BB%A9a",
        "isAvailable": true,
        "sortOrder": 23,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p Cam - D\u1ee9a",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p cam - d\u1ee9a v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20Cam%20-%20D%E1%BB%A9a",
        "isAvailable": true,
        "sortOrder": 24,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p Cam",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p cam v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20Cam",
        "isAvailable": true,
        "sortOrder": 25,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p C\u1ea7n T\u00e2y - D\u1ee9a",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p c\u1ea7n t\u00e2y - d\u1ee9a v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20C%E1%BA%A7n%20T%C3%A2y%20-%20D%E1%BB%A9a",
        "isAvailable": true,
        "sortOrder": 26,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p L\u1ef1u",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p l\u1ef1u v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20L%E1%BB%B1u",
        "isAvailable": true,
        "sortOrder": 27,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "N\u01b0\u1edbc \u00c9p Roi \u0110\u1ecf",
        "description": "M\u00f3n n\u01b0\u1edbc \u00e9p roi \u0111\u1ecf v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=N%C6%B0%E1%BB%9Bc%20%C3%89p%20Roi%20%C4%90%E1%BB%8F",
        "isAvailable": true,
        "sortOrder": 28,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      }
    ]
  },
  {
    "name": "Sinh t\u1ed1 tr\u00e1i c\u00e2y",
    "sortOrder": 5,
    "items": [
      {
        "name": "Sinh T\u1ed1 B\u01a1 Kem Chesse M\u00f3n M\u1edbi Si\u00eau Ngon",
        "description": "M\u00f3n sinh t\u1ed1 b\u01a1 kem chesse m\u00f3n m\u1edbi si\u00eau ngon v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Sinh%20T%E1%BB%91%20B%C6%A1%20Kem%20Chesse%20M%C3%B3n%20M%E1%BB%9Bi%20Si%C3%AAu%20Ngon",
        "isAvailable": true,
        "sortOrder": 1,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "B\u01a1 Gi\u00e0 D\u1eeba N\u01b0\u1edbng Si\u00eau Ngon",
        "description": "M\u00f3n b\u01a1 gi\u00e0 d\u1eeba n\u01b0\u1edbng si\u00eau ngon v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=B%C6%A1%20Gi%C3%A0%20D%E1%BB%ABa%20N%C6%B0%E1%BB%9Bng%20Si%C3%AAu%20Ngon",
        "isAvailable": true,
        "sortOrder": 2,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Chanh Leo N\u00fai \u0110\u00e1 Ahihi",
        "description": "M\u00f3n chanh leo n\u00fai \u0111\u00e1 ahihi v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Chanh%20Leo%20N%C3%BAi%20%C4%90%C3%A1%20Ahihi",
        "isAvailable": true,
        "sortOrder": 3,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Kem B\u01a1 D\u1eeba \u0110\u00e0 L\u1ea1t",
        "description": "M\u00f3n kem b\u01a1 d\u1eeba \u0111\u00e0 l\u1ea1t v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Kem%20B%C6%A1%20D%E1%BB%ABa%20%C4%90%C3%A0%20L%E1%BA%A1t",
        "isAvailable": true,
        "sortOrder": 4,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Kem B\u01a1 S\u1ea7u Ri\u00eang",
        "description": "M\u00f3n kem b\u01a1 s\u1ea7u ri\u00eang v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Kem%20B%C6%A1%20S%E1%BA%A7u%20Ri%C3%AAng",
        "isAvailable": true,
        "sortOrder": 5,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sinh T\u1ed1 B\u01a1",
        "description": "M\u00f3n sinh t\u1ed1 b\u01a1 v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Sinh%20T%E1%BB%91%20B%C6%A1",
        "isAvailable": true,
        "sortOrder": 6,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sinh T\u1ed1 Xo\u00e0i - Chanh Leo",
        "description": "M\u00f3n sinh t\u1ed1 xo\u00e0i - chanh leo v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Sinh%20T%E1%BB%91%20Xo%C3%A0i%20-%20Chanh%20Leo",
        "isAvailable": true,
        "sortOrder": 7,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sinh T\u1ed1 B\u01a1 D\u1eeba",
        "description": "M\u00f3n sinh t\u1ed1 b\u01a1 d\u1eeba v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Sinh%20T%E1%BB%91%20B%C6%A1%20D%E1%BB%ABa",
        "isAvailable": true,
        "sortOrder": 8,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sinh T\u1ed1 B\u01a1 Xo\u00e0i",
        "description": "M\u00f3n sinh t\u1ed1 b\u01a1 xo\u00e0i v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Sinh%20T%E1%BB%91%20B%C6%A1%20Xo%C3%A0i",
        "isAvailable": true,
        "sortOrder": 9,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sinh T\u1ed1 M\u00e3ng C\u1ea7u",
        "description": "M\u00f3n sinh t\u1ed1 m\u00e3ng c\u1ea7u v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Sinh%20T%E1%BB%91%20M%C3%A3ng%20C%E1%BA%A7u",
        "isAvailable": true,
        "sortOrder": 10,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "S\u1eefa Chua D\u1ebbo C\u1ed1m Non",
        "description": "M\u00f3n s\u1eefa chua d\u1ebbo c\u1ed1m non v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=S%E1%BB%AFa%20Chua%20D%E1%BA%BBo%20C%E1%BB%91m%20Non",
        "isAvailable": true,
        "sortOrder": 11,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sinh T\u1ed1 Xo\u00e0i D\u1eeba",
        "description": "M\u00f3n sinh t\u1ed1 xo\u00e0i d\u1eeba v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Sinh%20T%E1%BB%91%20Xo%C3%A0i%20D%E1%BB%ABa",
        "isAvailable": true,
        "sortOrder": 12,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sinh T\u1ed1 Xo\u00e0i M\u00e3ng C\u1ea7u",
        "description": "M\u00f3n sinh t\u1ed1 xo\u00e0i m\u00e3ng c\u1ea7u v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Sinh%20T%E1%BB%91%20Xo%C3%A0i%20M%C3%A3ng%20C%E1%BA%A7u",
        "isAvailable": true,
        "sortOrder": 13,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Sinh T\u1ed1 Xo\u00e0i",
        "description": "M\u00f3n sinh t\u1ed1 xo\u00e0i v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Sinh%20T%E1%BB%91%20Xo%C3%A0i",
        "isAvailable": true,
        "sortOrder": 14,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
            "sizeMl": 700,
            "price": 40000,
            "sortOrder": 2
          }
        ]
      },
      {
        "name": "Chanh Tuy\u1ebft AvoMoRi - Sinh T\u1ed1 Chanh Tuy\u1ebft",
        "description": "M\u00f3n chanh tuy\u1ebft avomori - sinh t\u1ed1 chanh tuy\u1ebft v\u1edbi 2 l\u1ef1a ch\u1ecdn dung t\u00edch 500ml v\u00e0 700ml, c\u00f3 th\u1ec3 th\u00eam topping theo s\u1edf th\u00edch.",
        "imageUrl": "https://placehold.co/800x600/f5f5f4/1c1917?text=Chanh%20Tuy%E1%BA%BFt%20AvoMoRi%20-%20Sinh%20T%E1%BB%91%20Chanh%20Tuy%E1%BA%BFt",
        "isAvailable": true,
        "sortOrder": 15,
        "variants": [
          {
            "name": "C\u1ed1c 500ml",
            "sizeMl": 500,
            "price": 30000,
            "sortOrder": 1
          },
          {
            "name": "C\u1ed1c 700ml",
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
