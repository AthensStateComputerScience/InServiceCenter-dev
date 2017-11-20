$(document).ready(function() {
    var from = document.getElementById("from_date").value;
    var to = document.getElementById("to_date").value;

    $('#financial_report_table').removeAttr('width').DataTable( {
        dom: 'Bfrtip',
        scrollX: true,
        autoWith: false,
        columnDefs: [
            { "width": 70, "targets": 0},
            { "width": 70, "targets": 1},
            { "width": 200, "targets": 2},
            { "width": 70, "targets": 3},
            { "width": 70, "targets": 4},
            { "width": 70, "targets": 5},
            { "width": 70, "targets": 6},
            { "width": 70, "targets": 7},
            { "width": 200, "targets": 8},
            { "width": 70, "targets": 9},
            { "width": 150, "targets": 10},
            { "width": 100, "targets": 11},
            { "width": 70, "targets": 12},
            { "width": 70, "targets": 13},
            { "width": 70, "targets": 14},
            { "width": 70, "targets": 15},
            { "width": 50, "targets": 15}
        ],
        buttons: {
            buttons: [
                {
                    extend: 'colvis',
                    text: 'Hide/Unhide Columns'
                },
                {
                    extend: 'print',
                    text: 'Print Table', 
                    title: 'Financial Report',
                    autoPrint: true,
                    customize: function (win) {
                        $(win.document.body)
                            .css('font-size', '10pt');

                        $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                    }
                },
                {
                    extend: 'excel',
                    text: 'Save to Excel',
                    title: 'Financial Report'
                },
                {
                    extend: 'pdfHtml5',
                    text: 'Save to PDF',
                    action: function(e, dt, node, config) 
                    {
                        var req = new XMLHttpRequest();
                        var fd = new FormData();

                        fd.append("report_from", from);
                        fd.append("report_to", to);

                        req.open("POST", "php/reports/financial_report/create_financial_report_pdf.php", true);
                        req.responseType = "blob";

                        req.onreadystatechange = function () 
                        {
                            if (req.readyState === 4 && req.status === 200) 
                            {
                                var filename = "Financial Report.pdf";
                                
                                if (typeof window.chrome !== 'undefined') 
                                {
                                    // Chrome version
                                    var link = document.createElement('a');

                                    link.href = window.URL.createObjectURL(req.response);
                                    link.download = filename;
                                    link.click();
                                } 
                                else if (typeof window.navigator.msSaveBlob !== 'undefined') 
                                {
                                    // IE version
                                    var blob = new Blob([req.response], { type: 'application/pdf' });
                                    window.navigator.msSaveBlob(blob, filename);
                                }
                                else
                                {
                                    // Firefox version
                                    var file = new File([req.response], filename, { type: 'application/force-download' });
                                    window.open(URL.createObjectURL(file));
                                }
                            }
                        };
                        req.send(fd);
                    }
                }
            ],
            columnDefs: [ {
                visible: false
            }]
        }
    });
});