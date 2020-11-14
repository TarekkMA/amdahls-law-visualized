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

var canvas = document.getElementById("myChart");
var ctx = canvas.getContext("2d");

draw();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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
// // set the dimensions and margins of the graph
// var margin = { top: 10, right: 40, bottom: 30, left: 30 },
//   width = 450 - margin.left - margin.right,
//   height = 400 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// var svG = d3
//   .select("#area")
//   .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// // Create data
// var dataf0_5 = getData(0.5, 16, (x) => Math.sqrt(x), 0, 16, symmetricEq);
// var dataf0_9 = getData(0.9, 16, (x) => Math.sqrt(x), 0, 16, symmetricEq);
// var dataf0_975 = getData(0.975, 16, (x) => Math.sqrt(x), 0, 16, symmetricEq);
// var dataf0_99 = getData(0.99, 16, (x) => Math.sqrt(x), 0, 16, symmetricEq);
// var dataf0_999 = getData(0.999, 16, (x) => Math.sqrt(x), 0, 16, symmetricEq);
// console.log(dataf0_5);
// // X scale and Axis
// var x = d3
//   .scaleLinear()
//   .domain([0, 16]) // This is the min and the max of the data: 0 to 100 if percentages
//   .range([0, width]); // This is the corresponding value I want in Pixel
// svG
//   .append("g")
//   .attr("transform", "translate(0," + height + ")")
//   .call(d3.axisBottom(x));

// // X scale and Axis
// var y = d3
//   .scaleLinear()
//   .domain([0, 16]) // This is the min and the max of the data: 0 to 100 if percentages
//   .range([height, 0]); // This is the corresponding value I want in Pixel
// svG.append("g").call(d3.axisLeft(y));

// // Add 3 dots for 0, 50 and 100%
// // svG
// //   .selectAll("whatever")
// //   .data(data)
// //   .enter()
// //   .append("circle")
// //   .classed("point", true)
// //   .attr("cx", function (d) {
// //     return x(d.x);
// //   })
// //   .attr("cy", function (d) {
// //     return y(d.y);
// //   })
// //   .attr("r", 3);

// svG
//   .append("path")
//   .datum(dataf0_5)
//   .attr("fill", "none")
//   .attr("stroke", "steelblue")
//   .attr("stroke-width", 1.5)
//   .attr(
//     "d",
//     d3
//       .line()
//       .x(function (d) {
//         return x(d.x);
//       })
//       .y(function (d) {
//         return y(d.y);
//       })
//   );

// svG
//   .append("path")
//   .datum(dataf0_5)
//   .attr("fill", "none")
//   .attr("stroke", "steelblue")
//   .attr("stroke-width", 1.5)
//   .attr(
//     "d",
//     d3
//       .line()
//       .x(function (d) {
//         return x(d.x);
//       })
//       .y(function (d) {
//         return y(d.y);
//       })
//   );

// svG
//   .append("path")
//   .datum(dataf0_9)
//   .attr("fill", "none")
//   .attr("stroke", "steelblue")
//   .attr("stroke-width", 1.5)
//   .attr(
//     "d",
//     d3
//       .line()
//       .x(function (d) {
//         return x(d.x);
//       })
//       .y(function (d) {
//         return y(d.y);
//       })
//   );
// svG
//   .append("path")
//   .datum(dataf0_975)
//   .attr("fill", "none")
//   .attr("stroke", "steelblue")
//   .attr("stroke-width", 1.5)
//   .attr(
//     "d",
//     d3
//       .line()
//       .x(function (d) {
//         return x(d.x);
//       })
//       .y(function (d) {
//         return y(d.y);
//       })
//   );
// svG
//   .append("path")
//   .datum(dataf0_99)
//   .attr("fill", "none")
//   .attr("stroke", "steelblue")
//   .attr("stroke-width", 1.5)
//   .attr(
//     "d",
//     d3
//       .line()
//       .x(function (d) {
//         return x(d.x);
//       })
//       .y(function (d) {
//         return y(d.y);
//       })
//   );
// svG
//   .append("path")
//   .datum(dataf0_999)
//   .attr("fill", "none")
//   .attr("stroke", "steelblue")
//   .attr("stroke-width", 1.5)
//   .attr(
//     "d",
//     d3
//       .line()
//       .x(function (d) {
//         return x(d.x);
//       })
//       .y(function (d) {
//         return y(d.y);
//       })
//   );

// //input

// function changeSize() {
//   d3.selectAll(".point").attr("r", this.value);
//   console.log(this.value);
// }

// d3.select("#radius").on("input", changeSize);
