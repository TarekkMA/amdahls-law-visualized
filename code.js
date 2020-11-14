//speedup equations

function symmetricEq(f, n, r, pref) {
  const a = (1 - f) / pref(r);
  const b = (f * r) / (pref(r) * n);
  return 1 / (a + b);
}

function asymmetricEq(f, n, r, pref) {
  const a = (1 - f) / pref(r);
  const b = f / (pref(r) + n - r);
  return 1 / (a + b);
}

function dynamicEq(f, n, r, pref) {
  const a = (1 - f) / pref(r);
  const b = f / n;
  return 1 / (a + b);
}

function getData(f, n, pref, fromR, toR, stepR, seedupEq) {
  let data = [];
  for (let i = fromR; i <= toR; i += stepR) {
    const val = seedupEq(f, n, i, pref);
    data.push({
      x: i,
      y: val,
    });
  }
  return data;
}

var fValuesColors = [
  [0.5, "red"],
  [0.9, ["blue"]],
  [0.975, "green"],
  [0.99, "black"],
  [0.999, "pink"],
];

draw();

function draw() {
  var chartContainer = document.getElementById("chart_container");

  const canvas = document.createElement("canvas");
  canvas.id = "chart";
  chartContainer.innerHTML = canvas.outerHTML;

  var ctx = document.getElementById("chart").getContext("2d");

  let eq = [symmetricEq, asymmetricEq, dynamicEq][
    document.getElementById("type").selectedIndex
  ];

  let n = parseInt(document.getElementById("n").value);
  let from = parseInt(document.getElementById("from").value);
  let to = parseInt(document.getElementById("to").value);
  let step = parseInt(document.getElementById("step").value);

  var myChart = new Chart(ctx, {
    type: "scatter",
    data: {
      datasets: fValuesColors.map((fC) => {
        let f = fC[0];
        let c = fC[1];
        let data = getData(f, n, (x) => Math.sqrt(x), from, to, step, eq);
        console.log("from", from, "to", to, "f=", f, data);
        return {
          data: data,
          borderColor: c,
          borderWidth: 1,
          pointBackgroundColor: c,
          pointRadius: 1,
          pointHoverRadius: 5,
          fill: false,
          showLine: true,
          label: "f=" + f,
        };
      }),
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
