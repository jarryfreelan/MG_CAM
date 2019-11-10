<?php
require('../src/CoinpaymentsAPI.php');
require('../src/keys.php');

/** Scenario: Show balances of all coins in account with USD conversion.**/
// Create a new API wrapper instance and call to the balances and rates commands.
try {
    $cps_api = new CoinpaymentsAPI($private_key, $public_key, 'json');
    $rates = $cps_api->GetShortRates();
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
    exit();
}

// Check for success of API calls
if ($rates['error'] == 'ok') {

    // Prepare arrays for storing balances
    $balances = [];

    // Prepare start of sample HTML output
    $output = '<table><tbody><tr><td>Currency</td><td>USD (Dollar)</td><td>Floating Point Balance</td><td>BTC rate</td></tr>';

    $usd_to_btc = $rates['result']['USD']['rate_btc'];
    $usd_value = 6;
    foreach ($rates['result'] as $currency => $rate) {

        $balancef = round($usd_value * ($usd_to_btc / $rate['rate_btc']), 8);

        array_push($balances, array(
            "currency" => $currency,
            "usd" => $usd_value,
            "balancef" => $balancef,
            "rate_btc" => $rate['rate_btc']
        ));
    }

    foreach ($balances as $balance) {
        $output .= '<tr><td>' . $balance['currency'] . '</td><td>' . $balance['usd'] . '</td><td>' . $balance['balancef'] . '</td><td>' . $balance['rate_btc'] . '</td></tr>';
    }

    $output .= '</tbody></table>';
    echo $output;

    // Check for positive balances and calculate the USD value for each
    // if (!empty($positive_balances)) {
    //     $usd_to_btc = $rates['result']['USD']['rate_btc'];
    //     foreach ($positive_balances as $currency => $positive_balance) {
    //         $positive_balances[$currency]['balancef'] = 1;
    //         $this_currency_to_btc = $rates['result'][$currency]['rate_btc'];
    //         $positive_balances[$currency]['usd_value'] = round($positive_balances[$currency]['balancef'] * ($this_currency_to_btc / $usd_to_btc), 2);
    //     }
    // }

    // Loop through balances and add values to the output variable
    // foreach ($positive_balances as $currency => $positive_balance) {
    //     $output .= '<tr><td>' . $currency . '</td><td>' . $positive_balance['balance'] . '</td><td>' . $positive_balance['balancef'] . '</td><td>' . $positive_balance['usd_value'] . '</td></tr>';
    // }

    // Close the sample output HTML and echo it onto the page
    // $output .= '</tbody></table>';
    // echo $output;

} else {

    // Throw an error if both API calls were not successful
    echo 'Balances API call status: ' . $balances['error'] . '<br>Rates API call status: ' . $rates['error'];
}

