import re
from pathlib import Path

path = Path(r"E:\AI_MoneyNest\moneynest-app.html")
content = path.read_text(encoding="utf-8")

old_css = """.material-symbols-rounded{
    font-size:24px;
    line-height:1;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    user-select:none;

    font-variation-settings:
        'FILL' 0,
        'wght' 500,
        'GRAD' 0,
        'opsz' 24;
}

.material-symbols-rounded.fill{
    font-variation-settings:
        'FILL' 1,
        'wght' 600,
        'GRAD' 0,
        'opsz' 24;
}"""

new_css = """.material-symbols-rounded{
    font-family:'Material Symbols Rounded';
    font-variation-settings:
        'FILL' 0,
        'wght' 500,
        'GRAD' 0,
        'opsz' 24;
    font-size:22px;
    line-height:1;
    vertical-align:middle;
    user-select:none;
    display:inline-flex;
    align-items:center;
    justify-content:center;
}

.material-symbols-rounded.fill{
    font-variation-settings:
        'FILL' 1,
        'wght' 600,
        'GRAD' 0,
        'opsz' 24;
}

.nav .material-symbols-rounded{
    font-size:24px;
}

.home-action .material-symbols-rounded,
.action-card .material-symbols-rounded{
    font-size:26px;
}

.category-icon .material-symbols-rounded{
    font-size:22px;
}

.transaction-icon .material-symbols-rounded{
    font-size:20px;
}

.nav button .material-symbols-rounded{
    color:#98a08d;
}

.nav button.on .material-symbols-rounded{
    color:var(--primary);
    font-variation-settings:
        'FILL' 1,
        'wght' 600,
        'GRAD' 0,
        'opsz' 24;
}

.stab.on .material-symbols-rounded,
.add-option-card.on .material-symbols-rounded,
.insights-tabchip.active .material-symbols-rounded{
    font-variation-settings:
        'FILL' 1,
        'wght' 600,
        'GRAD' 0,
        'opsz' 24;
}

.add-option-icon .material-symbols-rounded{
    font-size:22px;
}

.icon-btn .material-symbols-rounded{
    font-size:22px;
    color:#1f2937;
}

.hello-edit-btn .material-symbols-rounded{
    font-size:16px;
}

.bulk-row-remove .material-symbols-rounded,
.month-nav button .material-symbols-rounded,
.dash-month-switch button .material-symbols-rounded,
.insights-month-switch button .material-symbols-rounded,
.calendar-head button .material-symbols-rounded{
    font-size:20px;
}"""

# CSS already updated in moneynest-app.html — skip CSS replacement.

if ".welcome-feature-icon .material-symbols-rounded" not in content:
    content = content.replace(
        ".calendar-head button .material-symbols-rounded{\n    font-size:20px;\n}",
        ".calendar-head button .material-symbols-rounded{\n    font-size:20px;\n}\n\n.welcome-feature-icon .material-symbols-rounded,\n.welcome-action-icon .material-symbols-rounded{\n    font-size:22px;\n}\n\n.welcome-float .material-symbols-rounded{\n    font-size:20px;\n}",
    )

if ".navigation .material-symbols-rounded" not in content:
    content = content.replace(
        ".nav .material-symbols-rounded{\n    font-size:24px;\n}",
        ".navigation .material-symbols-rounded,\n.nav .material-symbols-rounded{\n    font-size:24px;\n}",
    )

expense_tree = '''const EXPENSE_TREE={
  "Bills":{icon:"receipt_long",sub:{
    "DTH":{icon:"tv",fields:["amount","date","notes"]},
    "Electricity":{icon:"electric_bolt",fields:["amount","date","notes"]},
    "Gas":{icon:"gas_meter",fields:["amount","date","notes"]},
    "Mobile Recharge":{icon:"mobile",fields:["amount","date","notes"]},
    "Water":{icon:"water_drop",fields:["amount","date","notes"]},
    "WiFi":{icon:"wifi",fields:["amount","date","notes"]}
  }},
  "Finance":{icon:"account_balance",sub:{
    "Bank Charges":{icon:"account_balance",sub:{
      "Account Fees":{icon:"account_balance_wallet",fields:["amount","date","notes"]},
      "ATM Charges":{icon:"atm",fields:["amount","date","notes"]},
      "Penalties":{icon:"gavel",fields:["amount","date","notes"]},
      "SMS Charges":{icon:"sms",fields:["amount","date","notes"]}
    }},
    "EMI":{icon:"credit_card",sub:{
      "Credit Card EMI":{icon:"credit_card",fields:["amount","date","notes"]},
      "Home Loan":{icon:"home",fields:["amount","date","notes"]},
      "Personal Loan":{icon:"account_balance",fields:["amount","date","notes"]},
      "Vehicle Loan":{icon:"directions_car",fields:["amount","date","notes"]}
    }},
    "Investments":{icon:"trending_up",sub:{
      "Bonds":{icon:"request_quote",fields:["amount","date","notes"]},
      "Crypto":{icon:"currency_bitcoin",fields:["amount","date","notes"]},
      "EPF":{icon:"account_balance",fields:["amount","date","notes"]},
      "Fixed Deposits (FD)":{icon:"savings",fields:["amount","date","notes"]},
      "Gold":{icon:"diamond",fields:["amount","date","notes"]},
      "Mutual Funds":{icon:"finance",fields:["amount","date","notes"]},
      "PPF":{icon:"savings",fields:["amount","date","notes"]},
      "Stocks":{icon:"candlestick_chart",fields:["amount","date","notes"]}
    }},
    "Savings":{icon:"savings",sub:{
      "Emergency Fund":{icon:"health_and_safety",fields:["amount","date","notes"]},
      "General Savings":{icon:"savings",fields:["amount","date","notes"]}
    }}
  }},
  "Food & Drinks":{icon:"restaurant",sub:{
    "Bakery":{icon:"bakery_dining",_grocery:true,fields:["itemName","qty","unit","price","date","notes"]},
    "Beverages":{icon:"local_bar",_grocery:true,fields:["itemName","qty","unit","price","date","notes"]},
    "Curry Point":{icon:"japanese_curry",fields:["amount","date","notes"]},
    "Frozen":{icon:"ac_unit",_grocery:true,fields:["itemName","qty","unit","price","date","notes"]},
    "Fruits":{icon:"avocado_bean",_grocery:true,fields:["itemName","qty","unit","price","date","notes"]},
    "Restaurant":{icon:"restaurant",fields:["amount","date","notes"]},
    "Snacks":{icon:"cookie",_grocery:true,fields:["itemName","qty","unit","price","date","notes"]},
    "Street Food":{icon:"fastfood",fields:["amount","date","notes"]},
    "Tiffin Center":{icon:"breakfast_dining",fields:["amount","date","notes"]}
  }},
  "Groceries":{icon:"shopping_cart",_grocery:true,sub:{
    "Baby":{icon:"child_care",_grocery:true,fields:["itemName","qty","unit","price","date","notes"]},
    "Dairy":{icon:"local_drink",_grocery:true,fields:["itemName","qty","unit","price","date","notes"]},
    "Dry Fruits":{icon:"nutrition",_grocery:true,fields:["itemName","qty","unit","price","date","notes"]},
    "Household":{icon:"household_supplies",_grocery:true,fields:["itemName","qty","unit","price","date","notes"]},
    "Meat & Fish":{icon:"set_meal",_grocery:true,fields:["itemName","qty","unit","price","date","notes"]},
    "Oils":{icon:"oil_barrel",_grocery:true,fields:["itemName","qty","unit","price","date","notes"]},
    "Other":{icon:"category",_grocery:true,fields:["itemName","qty","unit","price","date","notes"]},
    "Pulses":{icon:"grain",_grocery:true,fields:["itemName","qty","unit","price","date","notes"]},
    "Ready Mixes":{icon:"blender",_grocery:true,fields:["itemName","qty","unit","price","date","notes"]},
    "Rice & Flour":{icon:"wheat",_grocery:true,fields:["itemName","qty","unit","price","date","notes"]},
    "Spices":{icon:"kebab_dining",_grocery:true,fields:["itemName","qty","unit","price","date","notes"]},
    "Toiletries":{icon:"sanitizer",_grocery:true,fields:["itemName","qty","unit","price","date","notes"]},
    "Vegetables":{icon:"grocery",_grocery:true,fields:["itemName","qty","unit","price","date","notes"]}
  }},
  "Health":{icon:"medical_services",sub:{
    "Insurance":{icon:"health_and_safety",sub:{
      "Health":{icon:"health_and_safety",fields:["amount","date","notes"]},
      "Life":{icon:"favorite",fields:["amount","date","notes"]}
    }},
    "Medical":{icon:"local_hospital",fields:["amount","hospital","medicine","date","notes"]}
  }},
  "Home":{icon:"home",sub:{
    "Appliances":{icon:"kitchen",fields:["amount","warranty","date","notes"]},
    "Cleaning Help":{icon:"cleaning_services",fields:["amount","date","notes"]},
    "Decor":{icon:"wall_art",fields:["amount","date","notes"]},
    "Furniture":{icon:"chair",fields:["amount","date","notes"]},
    "Maintenance":{icon:"home_repair_service",fields:["amount","date","notes"]},
    "Repairs":{icon:"handyman",fields:["amount","date","notes"]}
  }},
  "Leisure":{icon:"movie",sub:{
    "Entertainment":{icon:"movie",fields:["amount","date","notes"]},
    "Snacks":{icon:"fastfood",fields:["amount","date","notes"]}
  }},
  "Lifestyle":{icon:"shopping_bag",sub:{
    "Electronics":{icon:"devices",fields:["amount","warranty","date","notes"]},
    "Gifts":{icon:"redeem",fields:["amount","recipient","date","notes"]},
    "Personal Care":{icon:"spa",fields:["amount","date","notes"]},
    "Shopping":{icon:"shopping_bag",fields:["amount","date","notes"]}
  }},
  "Others":{icon:"category",sub:{
    "Custom":{icon:"edit_note",fields:["customName","amount","date","notes"]},
    "Misc":{icon:"more_horiz",fields:["amount","date","notes"]}
  }},
  "Rent":{icon:"apartment",fields:["amount","date","notes"]},
  "Transport":{icon:"commute",sub:{
    "Travel":{icon:"travel",fields:["amount","date","notes"]}
  }},
  "Vehicle":{icon:"moped",sub:{
    "Fuel":{icon:"local_gas_station",fields:["amount","liters","odometer","date","notes"]},
    "Insurance":{icon:"verified_user",fields:["amount","date","notes"]},
    "Parking":{icon:"local_parking",fields:["amount","date","notes"]},
    "Repairs":{icon:"car_repair",fields:["amount","odometer","date","notes"]},
    "Service":{icon:"build_circle",fields:["amount","odometer","date","notes"]},
    "Toll":{icon:"toll",fields:["amount","date","notes"]},
    "Washing":{icon:"local_car_wash",fields:["amount","date","notes"]}
  }}
};'''

start = content.index("const EXPENSE_TREE={")
end = content.index("};", start) + 2
content = content[:start] + expense_tree + content[end:]

content = re.sub(
    r"const CATEGORY_ICONS=\{[^}]+\};",
    """const CATEGORY_ICONS={
  'Vegetables':'grocery','Fruits':'nutrition','Pulses':'grain','Dairy':'local_drink','Meat & Fish':'set_meal','Snacks':'cookie','Beverages':'local_bar',
  'Frozen':'ac_unit','Bakery':'bakery_dining','Spices':'kebab_dining','Oils':'oil_barrel','Rice & Flour':'wheat','Ready Mixes':'blender','Dry Fruits':'nutrition',
  'Household':'household_supplies','Toiletries':'sanitizer','Baby':'child_care','Other':'category'
};""",
    content,
    count=1,
)

content = re.sub(
    r"const INCOME_ICONS=\{[^}]+\};",
    """const INCOME_ICONS={
  Salary:'payments',
  Business:'business_center',
  Interest:'percent',
  Dividends:'candlestick_chart',
  Gifts:'redeem',
  Refunds:'currency_exchange',
  Rewards:'workspace_premium',
  Coupons:'local_activity'
};""",
    content,
    count=1,
)

icon_helper = """
function iconHtml(name,filled=false,extraClass=''){
  if(!name||name==='•') return '';
  const cls=['material-symbols-rounded',filled?'fill':'',extraClass].filter(Boolean).join(' ');
  return `<span class="${cls}">${name}</span>`;
}
"""
if "function iconHtml(" not in content:
    content = content.replace(
        "const safeText=s=>String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;').replace(/'/g,'&#39;');",
        "const safeText=s=>String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;').replace(/'/g,'&#39;');" + icon_helper,
    )

content = content.replace("||'💳';", "||'payments';")
content = content.replace("let title='',icon='💳',", "let title='',icon='payments',")
content = content.replace("icon=INCOME_ICONS[record.category]||'💰';", "icon=INCOME_ICONS[record.category]||'account_balance_wallet';")
content = content.replace("icon='🔁';", "icon='swap_horiz';")

content = re.sub(
    r"function recentIcon\(p\)\{[\s\S]*?return \['🛍️',''\];\n\}",
    """function recentIcon(p){
  const cat=p.items?.[0]?.category||'Other';
  if(cat==='Vegetables'||cat==='Fruits') return ['shopping_cart',''];
  if(cat==='Snacks'||cat==='Beverages') return ['restaurant','food'];
  if(cat==='Household'||cat==='Toiletries'||cat==='Personal') return ['cleaning_services',''];
  return ['shopping_bag',''];
}""",
    content,
    count=1,
)

content = re.sub(
    r"function getEntryOptionIcon\(field, value\)\{[\s\S]*?return '•';\n\}",
    """function getEntryOptionIcon(field, value){
  const channelIcons={
    'Account':'account_balance',
    'Cash':'payments',
    'UPI':'qr_code_2',
    'Credit Card':'credit_card',
    'Rupay Credit UPI':'payment_card'
  };
  if(field==='incomeCategory') return INCOME_ICONS[value]||'account_balance_wallet';
  if(field==='transferFrom' || field==='transferTo') return channelIcons[value]||'swap_horiz';
  if(field==='direction') return value==='Receive'?'arrow_downward':'arrow_upward';
  return 'category';
}""",
    content,
    count=1,
)

content = content.replace("return subNode.icon||catNode.icon||'•';", "return subNode.icon||catNode.icon||'category';")
content = content.replace("return leafNode.icon||subNode.icon||catNode.icon||'•';", "return leafNode.icon||subNode.icon||catNode.icon||'category';")
content = content.replace("return '•';", "return 'category';")

replacements = [
    ("${EXPENSE_TREE[l1].icon} ${safeText(getCategoryLabel(l1))}", "${iconHtml(EXPENSE_TREE[l1].icon,false,'category-icon')} ${safeText(getCategoryLabel(l1))}"),
    ("${n2.icon} ${safeText(getCategoryLabel(l1,l2))}", "${iconHtml(n2.icon,false,'category-icon')} ${safeText(getCategoryLabel(l1,l2))}"),
    ("${EXPENSE_TREE[l1].sub[l2].sub[l3].icon} ${safeText(getCategoryLabel(l1,l2,l3))}", "${iconHtml(EXPENSE_TREE[l1].sub[l2].sub[l3].icon,false,'category-icon')} ${safeText(getCategoryLabel(l1,l2,l3))}"),
    ("<span class=\"add-option-icon\">${getEntryOptionIcon(field,opt)}</span>", "<span class=\"add-option-icon\">${iconHtml(getEntryOptionIcon(field,opt),false,'category-icon')}</span>"),
    ("<span style=\"font-size:16px\">${getExpenseIcon(e.category,e.subcategory,e.leaf)}</span>", "<span class=\"transaction-icon\">${iconHtml(getExpenseIcon(e.category,e.subcategory,e.leaf),false,'transaction-icon')}</span>"),
    ("<span style=\"font-size:22px\">${val.icon}</span>", "<span class=\"category-icon\">${iconHtml(val.icon,false,'category-icon')}</span>"),
    ("<span>${catNode.icon}</span>", "<span class=\"category-icon\">${iconHtml(catNode.icon,false,'category-icon')}</span>"),
    ("<div class=\"insights-donut-icon\">${item.icon}</div>", "<div class=\"insights-donut-icon\">${iconHtml(item.icon,false,'category-icon')}</div>"),
    ("<div class=\"insights-topcat-icon\">${getInsightCategoryIcon(topCategory.label)}</div>", "<div class=\"insights-topcat-icon\">${iconHtml(getInsightCategoryIcon(topCategory.label),false,'category-icon')}</div>"),
    ("flex:0 0 auto\">${purchaseIcon}</span>", "flex:0 0 auto\">${iconHtml(purchaseIcon,false,'transaction-icon')}</span>"),
    ("flex:0 0 auto\">${icon}</span>", "flex:0 0 auto\">${iconHtml(icon,false,'transaction-icon')}</span>"),
    ("<span style=\"font-size:16px\">${INCOME_ICONS[i.category]||'💰'}</span>", "<span class=\"transaction-icon\">${iconHtml(INCOME_ICONS[i.category]||'account_balance_wallet',false,'transaction-icon')}</span>"),
    ("<span style=\"font-size:20px\">${INCOME_ICONS[i.category]||'💰'}</span>", "<span class=\"transaction-icon\">${iconHtml(INCOME_ICONS[i.category]||'account_balance_wallet',false,'transaction-icon')}</span>"),
    ("<span style=\"font-size:18px\">${INCOME_ICONS[i.category]||'💰'}</span>", "<span class=\"transaction-icon\">${iconHtml(INCOME_ICONS[i.category]||'account_balance_wallet',false,'transaction-icon')}</span>"),
    ("<span style=\"font-size:16px\">${getExpenseIcon(e.category,e.subcategory,e.leaf)}</span>", "<span class=\"transaction-icon\">${iconHtml(getExpenseIcon(e.category,e.subcategory,e.leaf),false,'transaction-icon')}</span>"),
    ("<span style=\"font-size:20px\">${getExpenseIcon(e.category,e.subcategory,e.leaf)}</span>", "<span class=\"transaction-icon\">${iconHtml(getExpenseIcon(e.category,e.subcategory,e.leaf),false,'transaction-icon')}</span>"),
    ("<span style=\"font-size:18px\">${getExpenseIcon(e.category,e.subcategory,e.leaf)}</span>", "<span class=\"transaction-icon\">${iconHtml(getExpenseIcon(e.category,e.subcategory,e.leaf),false,'transaction-icon')}</span>"),
    ("<span style=\"font-size:16px\">🔁</span>", "<span class=\"transaction-icon\">${iconHtml('swap_horiz',false,'transaction-icon')}</span>"),
    ("<span style=\"font-size:20px\">🔁</span>", "<span class=\"transaction-icon\">${iconHtml('swap_horiz',false,'transaction-icon')}</span>"),
    ("<span style=\"font-size:18px\">🔁</span>", "<span class=\"transaction-icon\">${iconHtml('swap_horiz',false,'transaction-icon')}</span>"),
    ("flex:0 0 auto\">🔁</span>", "flex:0 0 auto\">${iconHtml('swap_horiz',false,'transaction-icon')}</span>"),
    ("Use the Add tab → 💳 Expense", "Use the Add tab → Expense"),
    ("justify-content:center;font-size:24px;flex:0 0 auto\">${icon}</span>", "justify-content:center;flex:0 0 auto\">${iconHtml(icon,false,'transaction-icon')}</span>"),
    ("${INCOME_ICONS[i.category]||'💰'}", "${iconHtml(INCOME_ICONS[i.category]||'account_balance_wallet',false,'transaction-icon')}"),
]

for old, new in replacements:
    content = content.replace(old, new)

static = [
    ("<strong>🔒</strong>", '<span class="material-symbols-rounded" aria-hidden="true">lock</span>'),
    (" 👋", ' <span class="material-symbols-rounded" aria-hidden="true">waving_hand</span>'),
    (">✎</button>", '><span class="material-symbols-rounded" aria-hidden="true">edit</span></button>'),
    ("Built with ❤️ by VISIRA", 'Built with <span class="material-symbols-rounded fill" aria-hidden="true">favorite</span> by VISIRA'),
    ('aria-label="Remove item">×</button>', 'aria-label="Remove item"><span class="material-symbols-rounded">close</span></button>'),
    ('line-height:1">×</button>', 'line-height:1"><span class="material-symbols-rounded">close</span></button>'),
    ('aria-label="Previous month">‹</button>', 'aria-label="Previous month"><span class="material-symbols-rounded">keyboard_arrow_left</span></button>'),
    ('aria-label="Next month">›</button>', 'aria-label="Next month"><span class="material-symbols-rounded">keyboard_arrow_right</span></button>'),
    ('onclick="shiftBudgetMonth(-1)" aria-label="Previous month">‹</button>', 'onclick="shiftBudgetMonth(-1)" aria-label="Previous month"><span class="material-symbols-rounded">keyboard_arrow_left</span></button>'),
    ('onclick="shiftBudgetMonth(1)" aria-label="Next month">›</button>', 'onclick="shiftBudgetMonth(1)" aria-label="Next month"><span class="material-symbols-rounded">keyboard_arrow_right</span></button>'),
    ('onclick="shiftSessionMonth(-1)">‹</button>', 'onclick="shiftSessionMonth(-1)"><span class="material-symbols-rounded">keyboard_arrow_left</span></button>'),
    ('onclick="shiftSessionMonth(1)">›</button>', 'onclick="shiftSessionMonth(1)"><span class="material-symbols-rounded">keyboard_arrow_right</span></button>'),
    ('onclick="shiftCalendarMonth(-1)">‹</button>', 'onclick="shiftCalendarMonth(-1)"><span class="material-symbols-rounded">keyboard_arrow_left</span></button>'),
    ('onclick="shiftCalendarMonth(1)">›</button>', 'onclick="shiftCalendarMonth(1)"><span class="material-symbols-rounded">keyboard_arrow_right</span></button>'),
    ('<span class="insights-chevron">›</span>', '<span class="insights-chevron"><span class="material-symbols-rounded">keyboard_arrow_right</span></span>'),
    ('<span class="welcome-action-arrow">›</span>', '<span class="welcome-action-arrow"><span class="material-symbols-rounded">keyboard_arrow_right</span></span>'),
    ('<span style="color:#ccc">›</span>', '<span style="color:#ccc"><span class="material-symbols-rounded">chevron_right</span></span>'),
]

welcome_svgs = [
    (
        """      <div class="welcome-float left-top">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 18V12"></path>
          <path d="M10 18V8"></path>
          <path d="M15 18V5"></path>
        </svg>
      </div>""",
        """      <div class="welcome-float left-top">
        <span class="material-symbols-rounded" aria-hidden="true">monitoring</span>
      </div>""",
    ),
    (
        """      <div class="welcome-float right-top">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 8.5h16"></path>
          <path d="M6 8.5V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"></path>
          <path d="M15 13h.01"></path>
        </svg>
      </div>""",
        """      <div class="welcome-float right-top">
        <span class="material-symbols-rounded" aria-hidden="true">account_balance_wallet</span>
      </div>""",
    ),
    (
        """      <div class="welcome-float left-bottom">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 12a9 9 0 1 1-9-9"></path>
          <path d="M12 12V3"></path>
          <path d="M12 12l6 3"></path>
        </svg>
      </div>""",
        """      <div class="welcome-float left-bottom">
        <span class="material-symbols-rounded" aria-hidden="true">trending_up</span>
      </div>""",
    ),
    (
        """      <div class="welcome-float right-bottom">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z"></path>
          <path d="m9.5 12 1.8 1.8 3.7-4"></path>
        </svg>
      </div>""",
        """      <div class="welcome-float right-bottom">
        <span class="material-symbols-rounded" aria-hidden="true">lock</span>
      </div>""",
    ),
    (
        """      <div class="welcome-feature-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z"></path>
          <path d="M12 10v5"></path>
          <path d="M9.5 12.5h5"></path>
        </svg>
      </div>""",
        """      <div class="welcome-feature-icon">
        <span class="material-symbols-rounded" aria-hidden="true">lock</span>
      </div>""",
    ),
    (
        """      <div class="welcome-feature-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 16.5A4.5 4.5 0 0 0 17.5 8H16A6 6 0 1 0 5 14.5"></path>
          <path d="M8 17a4 4 0 0 0 8 0"></path>
          <path d="m9 17 3-3 3 3"></path>
        </svg>
      </div>""",
        """      <div class="welcome-feature-icon">
        <span class="material-symbols-rounded" aria-hidden="true">backup</span>
      </div>""",
    ),
    (
        """      <div class="welcome-feature-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 18V12"></path>
          <path d="M10 18V8"></path>
          <path d="M15 18V5"></path>
        </svg>
      </div>""",
        """      <div class="welcome-feature-icon">
        <span class="material-symbols-rounded" aria-hidden="true">monitoring</span>
      </div>""",
    ),
    (
        """      <div class="welcome-feature-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 8.5h16"></path>
          <path d="M6 8.5V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"></path>
          <path d="M15 13h.01"></path>
        </svg>
      </div>""",
        """      <div class="welcome-feature-icon">
        <span class="material-symbols-rounded" aria-hidden="true">payments</span>
      </div>""",
    ),
    (
        """      <span class="welcome-action-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5v14"></path>
          <path d="M5 12h14"></path>
        </svg>
      </span>""",
        """      <span class="welcome-action-icon">
        <span class="material-symbols-rounded" aria-hidden="true">add</span>
      </span>""",
    ),
    (
        """      <span class="welcome-action-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 3h6l5 5v13H5V3z"></path>
          <path d="M14 3v5h5"></path>
          <path d="M9 13h6"></path>
          <path d="M9 17h6"></path>
        </svg>
      </span>""",
        """      <span class="welcome-action-icon">
        <span class="material-symbols-rounded" aria-hidden="true">restore</span>
      </span>""",
    ),
]
for old, new in welcome_svgs:
    content = content.replace(old, new)

for old, new in static:
    content = content.replace(old, new)

content = content.replace(
    """      <button class="icon-btn" onclick="openSett()" aria-label="Open settings">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 7h16"></path>
          <path d="M4 12h16"></path>
          <path d="M4 17h16"></path>
        </svg>
      </button>""",
    """      <button class="icon-btn" onclick="openSett()" aria-label="Open settings">
        <span class="material-symbols-rounded">settings</span>
      </button>""",
)
content = content.replace(
    """      <button class="icon-btn" onclick="openListSessions()" aria-label="Search transactions">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="7"></circle>
          <path d="m20 20-3.5-3.5"></path>
        </svg>
      </button>""",
    """      <button class="icon-btn" onclick="openListSessions()" aria-label="Search transactions">
        <span class="material-symbols-rounded">search</span>
      </button>""",
)
content = content.replace(
    """      <button class="icon-btn notify-wrap" onclick="openCalendarView()" aria-label="Open calendar">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
          <path d="M10.3 21a2 2 0 0 0 3.4 0"></path>
        </svg>
        <span class="notify-dot"></span>
      </button>""",
    """      <button class="icon-btn notify-wrap" onclick="openCalendarView()" aria-label="Open calendar">
        <span class="material-symbols-rounded">calendar_month</span>
        <span class="notify-dot"></span>
      </button>""",
)

content = content.replace(
    """      <button class="on" id="navDash" onclick="goTab('dash',this)">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>
        Home
      </button>""",
    """      <button class="on" id="navDash" onclick="goTab('dash',this)">
        <span class="material-symbols-rounded">dashboard</span>
        Home
      </button>""",
)
content = content.replace(
    """      <button id="navHist" onclick="goTab('hist',this)">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
        Insights
      </button>""",
    """      <button id="navHist" onclick="goTab('hist',this)">
        <span class="material-symbols-rounded">monitoring</span>
        Insights
      </button>""",
)
content = content.replace(
    """      <button class="add-btn" id="navAdd" onclick="goTab('add',this)">
        <span class="add-icon" aria-hidden="true"></span>
        Add
      </button>""",
    """      <button class="add-btn" id="navAdd" onclick="goTab('add',this)">
        <span class="material-symbols-rounded">add</span>
        Add
      </button>""",
)
content = content.replace(
    """      <button id="navList" onclick="goTab('list',this)">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg>
        <span id="lNavLbl">List</span>
      </button>""",
    """      <button id="navList" onclick="goTab('list',this)">
        <span class="material-symbols-rounded">receipt_long</span>
        <span id="lNavLbl">List</span>
      </button>""",
)
content = content.replace(
    """      <button id="navIns" onclick="goTab('ins',this)">
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82L4.21 7.1a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c0 .67.39 1.28 1 1.51.16.06.33.09.51.09H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        More
      </button>""",
    """      <button id="navIns" onclick="goTab('ins',this)">
        <span class="material-symbols-rounded">settings</span>
        More
      </button>""",
)

path.write_text(content, encoding="utf-8")
print("Wrote", path)
